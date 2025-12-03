# Deployment Guide

## Server Information
- **VPS IP**: 148.230.118.19
- **Domain**: x.subercraftex.com
- **SSH**: `ssh root@148.230.118.19`

## Prerequisites
1. Ensure domain `x.subercraftex.com` points to `148.230.118.19`
2. SSH access to the VPS
3. Git repository is up to date

## Quick Deployment

Run the deployment script:
```bash
./deploy.sh
```

This script will:
1. Test SSH connection
2. Install system dependencies (Node.js, MongoDB, PM2, Nginx)
3. Clone/update the repository on VPS
4. Create production environment file
5. Install backend and frontend dependencies
6. Build the React application
7. Create superadmin account
8. Configure PM2 process manager
9. Install and configure SSL certificate with Let's Encrypt
10. Configure Nginx as reverse proxy

## Superadmin Credentials
- **Email**: mohamad.siysinyuy@gmail.com
- **Password**: Msb1@@@@

## Manual Deployment Steps

If you prefer to deploy manually:

### 1. SSH into VPS
```bash
ssh root@148.230.118.19
```

### 2. Install Dependencies
```bash
# Update system
apt-get update

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-6.0.list
apt-get update
apt-get install -y mongodb-org

# Start MongoDB
systemctl start mongod
systemctl enable mongod

# Install PM2 and Nginx
npm install -g pm2
apt-get install -y nginx certbot python3-certbot-nginx
```

### 3. Clone Repository
```bash
mkdir -p /var/www
cd /var/www
git clone https://github.com/mrsuber/family-social-site-pes-01.git
cd family-social-site-pes-01
```

### 4. Configure Environment
```bash
cat > .env << 'EOF'
DISABLE_COLLECTSTATIC = 1
JWT_EXPIRE = 144min
JWT_SECRET = 02dc7f7bf1c2fe9bd2464eea0ff4f92958409cad8c07158edb85080064320b5884ecd9
MONGO_URI=mongodb://localhost:27017/msbSocial
NODE_ENV = production
PORT = 5001
EOF
```

### 5. Install Dependencies and Build
```bash
# Backend
npm install

# Frontend
cd client
npm install
npm run build
cd ..
```

### 6. Create Superadmin
```bash
node createSuperAdmin.js
```

### 7. Start Application
```bash
pm2 start server.js --name "family-social-site"
pm2 save
pm2 startup systemd
```

### 8. Configure Nginx
```bash
cat > /etc/nginx/sites-available/family-social-site << 'EOF'
server {
    listen 80;
    server_name x.subercraftex.com;

    location / {
        proxy_pass http://localhost:5001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /socket.io/ {
        proxy_pass http://localhost:5001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
EOF

ln -sf /etc/nginx/sites-available/family-social-site /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl restart nginx
```

### 9. Setup SSL
```bash
certbot --nginx -d x.subercraftex.com --non-interactive --agree-tos --email mohamad.siysinyuy@gmail.com --redirect
```

## Access Your Application
- **HTTPS**: https://x.subercraftex.com
- **HTTP**: http://x.subercraftex.com
- **IP**: http://148.230.118.19

## Useful Commands

### Application Management
```bash
# View logs
pm2 logs family-social-site

# Restart application
pm2 restart family-social-site

# Stop application
pm2 stop family-social-site

# Application status
pm2 status
```

### MongoDB Management
```bash
# Check MongoDB status
systemctl status mongod

# Restart MongoDB
systemctl restart mongod

# MongoDB logs
journalctl -u mongod
```

### Nginx Management
```bash
# Check Nginx status
systemctl status nginx

# Restart Nginx
systemctl restart nginx

# Test configuration
nginx -t

# View error logs
tail -f /var/log/nginx/error.log
```

### SSL Certificate Management
```bash
# Renew SSL certificate
certbot renew

# Test SSL certificate renewal
certbot renew --dry-run
```

### Update Deployment
```bash
cd /var/www/family-social-site-pes-01
git pull origin master
npm install
cd client
npm install
npm run build
cd ..
pm2 restart family-social-site
```

## Troubleshooting

### Application not starting
```bash
# Check PM2 logs
pm2 logs family-social-site

# Check if port 5001 is in use
netstat -tulpn | grep 5001
```

### MongoDB connection issues
```bash
# Check MongoDB is running
systemctl status mongod

# Check MongoDB logs
journalctl -u mongod -f
```

### Nginx issues
```bash
# Check Nginx configuration
nginx -t

# Check Nginx logs
tail -f /var/log/nginx/error.log
```

### SSL issues
```bash
# Check certificate status
certbot certificates

# Force renewal
certbot renew --force-renewal
```

## Firewall Configuration (if needed)
```bash
# Allow HTTP and HTTPS
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 22/tcp
ufw enable
```
