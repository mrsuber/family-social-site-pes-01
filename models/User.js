const crypto = require('crypto');
const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sequelize } = require('../config/db');

class User extends Model {
  async matchPasswords(password) {
    return await bcrypt.compare(password, this.password);
  }

  getSignedToken() {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
  }

  refreshToken() {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, { expiresIn: '30d' });
  }

  getResetPasswordToken() {
    const resetToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000);
    return resetToken;
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    fullname: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: 'please provide a username' }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: 'Please fill valid email address' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 255],
          msg: 'Password must be at least 6 characters'
        }
      }
    },
    profilePic: {
      type: DataTypes.STRING,
      defaultValue: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png'
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user'
    },
    gender: {
      type: DataTypes.STRING,
      defaultValue: 'male'
    },
    mobile: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    address: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    story: {
      type: DataTypes.STRING(200),
      defaultValue: ''
    },
    website: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    saved: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      defaultValue: []
    },
    followers: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      defaultValue: []
    },
    following: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      defaultValue: []
    },
    isApplication1: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isApplication2: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isApplication3: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isStudentTech: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isStudentRel: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isSuperAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    resetPasswordExpire: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    hooks: {
      beforeSave: async (user) => {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
    }
  }
);

module.exports = User;
