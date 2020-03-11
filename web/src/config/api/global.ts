export default {
  namespace: 'global',

  apis: {
    get: '/test/abc',

    getWithDynamicSegment: '/test/:id/abc',

    post: 'post /test/:id/abc',

    put: 'put /test/abc',

    delete: 'delete /test/abc',
    // 保存用户根目录
    saveRootDir: 'get /save'
  },
};
