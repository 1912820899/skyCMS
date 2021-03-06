import createApp from './main';

export default (ctx) => {
    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp();
        router.push(ctx.url);
        router.onReady(async () => {
            
            const matchedComponents = router.getMatchedComponents()
            // if (!matchedComponents.length) {
            //     return reject('没有匹配到到路由')
            // }
            // try {
            //     let ar = getAllAsyncData(matchedComponents, {
            //         store,
            //         route: router.currentRoute
            //     });
            //     await (Promise.all())
            //     ctx.state = store.state;
            //     resolve(app);
            // } catch (error) {
            //     reject(error);
            // }
            Promise.all(matchedComponents.map(({ asyncData }) =>
                asyncData && asyncData({
                    store,
                    route: router.currentRoute
                }))).then(() => {
                    ctx.state = store.state;
                    resolve(app);
                }).catch(reject)

        }, reject)
    });

}