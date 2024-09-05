function paginate(query, { page = 1, limit = 10 }) {
  return query.limit(limit * 1).skip((page - 1) * limit);
}

module.exports = {
  paginate,
};
