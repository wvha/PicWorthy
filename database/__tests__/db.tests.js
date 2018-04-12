beforeAll(() => {
  mongoose.connect(dbURL);
})

afterAll((done) => {
  mongoose.disconnect(done);
})
