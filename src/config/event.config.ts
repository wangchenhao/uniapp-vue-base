export const events = {
    toast: {
        show: 'ON_MESSAGE_SHOW'
    },
    login: {
        show: 'ON_LOGIN_SHOW',
        result: 'ON_LOGIN_RESULT'
    },
    dialog: {
        show: 'ON_DIALOG_SHOW',
        select: 'ON_DIALOG_SELECT'
    },
    router: {
        params: 'ON_ROUTER_PARAMS',
        back: 'ON_ROUTER_BACK'
    }
} as const
