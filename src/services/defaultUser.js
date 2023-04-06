const users = require('./users.js');
const { env, permissionNames, actions } = require('../config.js');
const { encrypt } = require('../helpers/crypto.js');

module.exports = async function addDefaultUser()
{
    try{
        const { DEFAULT_USER_USERNAME, DEFAULT_USER_PASSWORD, DEFAULT_USER_FULLNAME } = env;

        const password = encrypt(DEFAULT_USER_PASSWORD);
        const isUserExist = await users.isUserExist(DEFAULT_USER_USERNAME);

        if(isUserExist) return;
    
        const _actions = Object.values(actions);
        const permissions = Object.values(permissionNames).map(name => {
            return {name, actions: _actions}
        });

        return await users.addUser({username: DEFAULT_USER_USERNAME, fullname: DEFAULT_USER_FULLNAME, password, permissions});
    }
    catch(e)
    {
        console.error(e.message);
    }
}