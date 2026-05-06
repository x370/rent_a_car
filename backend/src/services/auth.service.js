const { prisma } = require('../config/db.config');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwt.utils');

/**
 * Business logic to create a new user
 * @param {Object} userData 
 * @returns {Promise<Object>}
 */
const createUser = async (userData) => {
  const { name, email, phone, password, role } = userData;
  const existingUser = await prisma.user.findFirst({
    where: { OR: [{ email }, { phone }] }
  });

  if (existingUser) {
    throw new Error('User with this email or phone already exists');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      phone,
      password: hashedPassword,
      role: role || 'CUSTOMER'
    }
  });

  return user;
};

/**
 * Business logic to login a user
 * @param {Object} loginData 
 * @returns {Promise<Object>}
 */
const loginUser = async (loginData) => {
  const { email, password } = loginData;

  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  const token = generateToken({ id: user.id, role: user.role });

  return { user, token };
};

module.exports = { createUser, loginUser };
