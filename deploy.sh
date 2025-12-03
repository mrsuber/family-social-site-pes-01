#!/bin/bash

# Deployment script for family-social-site
# VPS: 148.230.118.19
# Domain: x.subercraftex.com

echo "Starting deployment process..."

# Variables
VPS_IP="148.230.118.19"
VPS_USER="root"
APP_NAME="family-social-site-pes-01"
APP_DIR="/var/www/$APP_NAME"
REPO_URL="https://github.com/mrsuber/family-social-site-pes-01.git"
DOMAIN="x.subercraftex.com"
EMAIL="mohamad.siysinyuy@gmail.com"

echo "Step 1: Testing SSH connection..."
ssh -o ConnectTimeout=10 -o StrictHostKeyChecking=no $VPS_USER@$VPS_IP "echo 'SSH connection successful'"

if [ $? -ne 0 ]; then
    echo "Error: Cannot connect to VPS. Please check your SSH connection."
    exit 1
fi

echo "Step 2: Installing system dependencies..."
ssh $VPS_USER@$VPS_IP << 'ENDSSH'
# Update system
apt-get update

# Install git if not present
apt-get install -y git

# Install Node.js (v20.x)
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs
fi

# Install MongoDB
if ! command -v mongod &> /dev/null; then
    wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | apt-key add -
    echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-6.0.list
    apt-get update
    apt-get install -y mongodb-org
fi

# Start MongoDB
systemctl start mongod
systemctl enable mongod

# Install PM2
if ! command -v pm2 &> /dev/null; then
    npm install -g pm2
fi

# Install nginx
if ! command -v nginx &> /dev/null; then
    apt-get install -y nginx
fi

echo "Dependencies installed successfully"
ENDSSH

echo "Step 3: Cloning/updating repository on VPS..."
ssh $VPS_USER@$VPS_IP << ENDSSH
mkdir -p /var/www
cd /var/www

if [ -d "$APP_NAME" ]; then
    echo "Repository exists. Pulling latest changes..."
    cd $APP_NAME
    git pull origin master
else
    echo "Cloning repository..."
    git clone $REPO_URL
    cd $APP_NAME
fi
ENDSSH

echo "Step 4: Copying production environment file..."
ssh $VPS_USER@$VPS_IP "cat > $APP_DIR/.env << 'EOF'
DISABLE_COLLECTSTATIC = 1
JWT_EXPIRE = 144min
JWT_SECRET = 02dc7f7bf1c2fe9bd2464eea0ff4f92958409cad8c07158edb85080064320b5884ecd9
MONGO_URI=mongodb://localhost:27017/msbSocial
NODE_ENV = production
PORT = 5001
EOF"

echo "Step 5: Installing backend dependencies..."
ssh $VPS_USER@$VPS_IP "cd $APP_DIR && npm install"

echo "Step 6: Installing client dependencies and building React app..."
ssh $VPS_USER@$VPS_IP "cd $APP_DIR/client && npm install && npm run build"

echo "Step 7: Creating superadmin account..."
ssh $VPS_USER@$VPS_IP "cd $APP_DIR && node createSuperAdmin.js"

echo "Step 8: Setting up PM2 to run the application..."
ssh $VPS_USER@$VPS_IP << 'ENDSSH'
cd /var/www/family-social-site-pes-01
pm2 stop all
pm2 delete all
pm2 start server.js --name "family-social-site"
pm2 save
pm2 startup systemd
ENDSSH

echo "Step 9: Installing Certbot for SSL..."
ssh $VPS_USER@$VPS_IP << 'ENDSSH'
# Install certbot
apt-get install -y certbot python3-certbot-nginx
ENDSSH

echo "Step 10: Configuring Nginx (initial HTTP config)..."
ssh $VPS_USER@$VPS_IP << ENDSSH
cat > /etc/nginx/sites-available/family-social-site << 'EOF'
server {
    listen 80;
    server_name $DOMAIN;

    location / {
        proxy_pass http://localhost:5001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    location /socket.io/ {
        proxy_pass http://localhost:5001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    }
}
EOF

ln -sf /etc/nginx/sites-available/family-social-site /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl restart nginx
ENDSSH

echo "Step 11: Obtaining SSL certificate..."
echo "IMPORTANT: Make sure your domain $DOMAIN points to $VPS_IP"
read -p "Press Enter to continue with SSL certificate setup (or Ctrl+C to skip)..."

ssh $VPS_USER@$VPS_IP << ENDSSH
certbot --nginx -d $DOMAIN --non-interactive --agree-tos --email $EMAIL --redirect
ENDSSH

echo ""
echo "========================================="
echo "Deployment completed successfully!"
echo "========================================="
echo ""
echo "Your application is now running at:"
echo "  - HTTPS: https://$DOMAIN"
echo "  - HTTP: http://$DOMAIN"
echo "  - IP: http://$VPS_IP"
echo ""
echo "Superadmin credentials:"
echo "  Email: $EMAIL"
echo "  Password: Msb1@@@@"
echo ""
echo "Useful commands:"
echo "  - View logs: ssh root@$VPS_IP 'pm2 logs'"
echo "  - Restart app: ssh root@$VPS_IP 'pm2 restart family-social-site'"
echo "  - Stop app: ssh root@$VPS_IP 'pm2 stop family-social-site'"
echo "  - Renew SSL: ssh root@$VPS_IP 'certbot renew'"
echo "========================================="
