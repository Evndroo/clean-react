import { faker } from "@faker-js/faker";

import { RemoteAuthentication } from "./remote-authentication";
import { HttpPostClientSpy } from "@/data/test/mock-http-client";
import { mockAuthentication } from "@/domain/test/mock-authentication";

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);

  return { sut, httpPostClientSpy };
};

describe("Remote authentication", () => {
  it("should call hhtpClient with correct URL", async () => {
    const url = faker.internet.url();

    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.auth(mockAuthentication());

    expect(httpPostClientSpy.url).toBe(url);
  });

  it("should call hhtpClient with correct body", async () => {
    const rauthParams = mockAuthentication();
    const { sut, httpPostClientSpy } = makeSut();
    await sut.auth(rauthParams);

    expect(httpPostClientSpy.body).toEqual(rauthParams);
  });
});
