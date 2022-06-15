import { RemoteAuthentication } from "./remote-authentication";
import { HttpPostClientSpy } from "../../test/mock-http-client";

const makeSut = (url: string = "any_url") => {
  const httpPostClientSpy = new HttpPostClientSpy();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);

  return { sut, httpPostClientSpy };
};

describe("Remote authentication", () => {
  it("should call hhtpClient with correct URL", async () => {
    const url = "other_url";

    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.auth();

    expect(httpPostClientSpy.url).toBe(url);
  });
});
