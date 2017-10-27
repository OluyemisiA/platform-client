module.exports = PostMetadataService;

PostMetadataService.$inject = [
    'Util',
    'UserEndpoint',
    'ContactEndpoint'
];

function PostMetadataService(
    Util,
    UserEndpoint,
    ContactEndpoint
) {
    var PostMetadataService = {
        // Format source (fixme!)
        formatSource: function (source) {
            if (source === 'sms') {
                return 'SMS';
            } else if (source) {
                // Uppercase first character
                return source.charAt(0).toUpperCase() + source.slice(1);
            } else {
                return 'Web';
            }
        },
        loadUser: function (post) {
            if (post.user && post.user.id) {
                return UserEndpoint.get({id: post.user.id});
            } else {
                return post.user;
            }
        },
        loadContact: function (post) {
            if (!post.user && post.contact && post.contact.id) {
                return ContactEndpoint.get(
                    { id: post.contact.id, ignore403: true },
                    (resp) => {
                        console.log(resp);
                    },
                    angular.noop
                );
            } else {
                return post.contact;
            }
        }
    };

    return Util.bindAllFunctionsToSelf(PostMetadataService);
}
