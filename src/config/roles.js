const AccessControl = require("accesscontrol");

let grantsObject = {
    editor: {
        events: {
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*']
        },
        articles: {
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*']
        }
    },
    writer: {
        articles: {
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*']
        }
    },
    staff: {
        events: {
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*']
        }
    },
    basic: {
        articles: {
            'read:any': ['*', '!id']
        },
        events: {
            'read:any': ['*', '!id']
        }
    }
};

const ac = new AccessControl(grantsObject);
module.exports = ac;