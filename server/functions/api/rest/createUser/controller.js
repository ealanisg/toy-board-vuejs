'use strict'
const userModel = require('../../../../models/userModel');
const { sign } = require('../../../../utils/util');
const { TOKEN_EXP_SECONDS } = require('../../../../utils/consts');
const { ok, badRequest } = require('../../../../utils/response');
const bcrypt = require('bcryptjs');

const createController = async(event) => {
  const body = JSON.parse(event.body);
  if (!body.user) return badRequest('User is required');
  const newUser = body.user;
  if (!newUser.id) return badRequest('Userid is required');
  if (!newUser.password) return badRequest('Password is required');

  const encryptedPassword = bcrypt.hashSync(newUser.password, 8);
  let item = {
    pk: 'user',
    sk: newUser.id,
    content: newUser.name,
    password: encryptedPassword,
    userid: newUser.id
  };
  await userModel.put(item);
  const token = sign(newUser);
  const headers = {
    'Set-Cookie': 'jwt=' + token + '; Path=/; Expires=' + new Date(new Date().getTime() + 1000 * TOKEN_EXP_SECONDS).toUTCString()
  }
  return ok({}, headers);
}

module.exports = createController