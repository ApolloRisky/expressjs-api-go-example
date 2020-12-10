const postSerializer = (object) => ({
  id: object.id,
  title: object.title,
  description: object.description,
  body: object.body,
  createdAt: object.createdAt,
  updatedAt: object.updatedAt,
});

const postCollectionSerializer = (posts) => posts.map((post) => postSerializer(post));

module.exports = {
  postSerializer,
  postCollectionSerializer,
};
