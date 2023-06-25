const request = require("supertest");
const app = require("./app");
const { checkJwt } = require("./middleware/authorizationMiddleware");

jest.mock("./middleware/authorizationMiddleware");

describe("GET /healthcheck", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should return 200 from /health", async () => {
    const res = await request(app).get("/api/health");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ message: "OK!" });
  });

  test("should return 200 from private endpoint when authenticated", async () => {
    checkJwt.mockImplementation((req, res, next) => next());

    const res = await request(app).get("/api/private");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ message: "Private OK!" });
  });

  test("should return 401 when user is not authenticated", async () => {
    checkJwt.mockImplementation((req, res, next) => {
      try {
        const error = new Error("Unauthenticated");
        error.status = 401;
        throw error;
      } catch (err) {
        next(err);
      }
    });

    await request(app)
      .get("/api/private")
      .set("Accept", "application/json")
      .expect((response) => {
        expect(response.status).toEqual(401);
      });
  });
});
