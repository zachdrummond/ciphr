module.exports = {
  async up(db, client) {
    await db
    .collection("users")
    .updateMany(
      {},
      { $set: { starredSolutions: [] } },
      { upsert: true }
    );
  },

  async down(db, client) {
    await db
    .collection("users")
    .updateMany({}, { $unset: { solutions: null } });
  }
};
