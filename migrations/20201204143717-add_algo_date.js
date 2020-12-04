module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    await db.collection('algorithms').updateMany({}, {$set: {createdAt: new Date('12.4.2020')}}, { upsert: true });
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    await db.collection('algorithms').updateMany({}, {$unset: {createdAt: null}});
  }
};
