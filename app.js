module.exports = app => {
    app.beforeStart(async () => {
        const ctx = app.createAnonymousContext();
        // preload before app start
        const res = await ctx.service.user.getUserInfo();
        app.userInfo = {
            ...res
        }
    });
};
