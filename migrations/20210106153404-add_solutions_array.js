module.exports = {
  async up(db, client) {
    await db
    .collection("algorithms")
    .updateMany(
      {},
      { $set: { solutions: [] } },
      { upsert: true }
    );
  },

  async down(db, client) {
    await db
    .collection("algorithms")
    .updateMany({}, { $unset: { solutions: null } });
  }
};
