const { prisma } = require('../config/db.config');
const bcrypt = require('bcryptjs');

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

module.exports = { createUser };
