module.exports = {
  async up(db, client) {
    await db
      .collection("algorithms")
      .updateMany(
        {},
        { $set: { createdAt: new Date("12.1.2020") } },
        { upsert: true }
      );
  },

  async down(db, client) {
    await db
      .collection("algorithms")
      .updateMany({}, { $unset: { createdAt: null } });
  },
};
