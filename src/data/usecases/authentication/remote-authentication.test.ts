import { faker } from "@faker-js/faker";

import { RemoteAuthentication } from "./remote-authentication";

import { HttpPostClientSpy } from "@/data/test";
import { HttpStatusCode } from "@/data/protocols/http";
import { AccountModel } from "@/domain/models";
import { AuthenticationParams } from "@/domain/usecases";
import { mockAuthentication, mockAccountModel } from "@/domain/test";
import { UnexpectedError, InvalidCredentialsError } from "@/domain/erros";

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<
    AuthenticationParams,
    AccountModel
  >();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);

  return { sut, httpPostClientSpy };
};

describe("Remote authentication", () => {
  it("should call httpClient with correct URL", async () => {
    const url = faker.internet.url();

    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.auth(mockAuthentication());

    expect(httpPostClientSpy.url).toBe(url);
  });

  it("should call httpClient with correct body", async () => {
    const url = faker.internet.url();

    const { sut, httpPostClientSpy } = makeSut(url);
    const authenticationParams = mockAuthentication();
    await sut.auth(authenticationParams);

    expect(httpPostClientSpy.body).toEqual(authenticationParams);
  });

  it("should throw InvalidCredentialsError if HttpPostClient returns 401", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized,
    };

    const authPromise = sut.auth(mockAuthentication());

    await expect(authPromise).rejects.toThrow(new InvalidCredentialsError());
  });

  it("should throw UnexpectedError if HttpPostClient returns 400", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };

    const authPromise = sut.auth(mockAuthentication());

    await expect(authPromise).rejects.toThrow(new UnexpectedError());
  });

  it("should throw UnexpectedError if HttpPostClient returns 404", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };

    const authPromise = sut.auth(mockAuthentication());

    await expect(authPromise).rejects.toThrow(new UnexpectedError());
  });

  it("should throw UnexpectedError if HttpPostClient returns 500", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };

    const authPromise = sut.auth(mockAuthentication());

    await expect(authPromise).rejects.toThrow(new UnexpectedError());
  });

  it("should return an AccountModel if HttpPostClient returns 200", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const httpResult = mockAccountModel();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };

    const account = await sut.auth(mockAuthentication());

    expect(account).toEqual(httpResult);
  });
});
