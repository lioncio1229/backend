const users = require('./users.js');
const { env, permissionNames, actions } = require('../config.js');

module.exports = async function addDefaultUser()
{
    try{
        const { DEFAULT_USER_USERNAME, DEFAULT_USER_PASSWORD, DEFAULT_USER_FULLNAME } = env;

        const isUserExist = await users.isUserExist(DEFAULT_USER_USERNAME);
        if(isUserExist) return;
    
        const _actions = Object.values(actions);
    
        const permissions = Object.values(permissionNames).map(name => {
            return {name, actions: _actions}
        });

        return await users.addUser({username: DEFAULT_USER_USERNAME, fullname: DEFAULT_USER_FULLNAME, password: DEFAULT_USER_PASSWORD, permissions});
    }
    catch(e)
    {
        console.error(e.message);
    }
}