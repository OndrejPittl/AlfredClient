

export const appConfig: any = {
  feed: {
    limit: 3
  },

  'menu': {
    'primary': [
      {
        identifier: 'discover',
        slug: 'discover',
        title: 'discover',
        loggedOnly: false
      }, {
        identifier: 'friends',
        slug: 'friends',
        title: 'friends',
        loggedOnly: true
      }, {
        identifier: 'rated',
        slug: 'rated',
        title: 'rated',
        loggedOnly: true
      }, {
        identifier: 'new-post',
        title: 'new post',
        modalTarget: 'new-post',
        isModal: true,
        loggedOnly: true
      }
    ],
   'secondary': [
     {
       identifier: 'discover',
       slug: 'discover',
       title: 'discover',
       loggedOnly: false
     }, {
       identifier: 'friends',
       slug: 'friends',
       title: 'friends',
       loggedOnly: true
     }
   ]
  }
};
