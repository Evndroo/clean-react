import axios from "axios";

import { mockAxios } from "@/infra/test";

import { AxiosHttpClient } from "./axios-http-client";
import { mockPostRequest } from "@/data/test";

jest.mock("axios");

type SutType = {
  sut: AxiosHttpClient;
  mockedAxios: jest.Mocked<typeof axios>;
};

const makeSut = (): SutType => {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockAxios();

  return {
    sut,
    mockedAxios,
  };
};

describe("AxiosHttpClient", () => {
  const mockedAxios = mockAxios();
  it("Should call axios with correct values", async () => {
    const request = mockPostRequest();
    const { sut } = makeSut();

    sut.post(request);

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  it("should return the correct reponse status and body", () => {
    const { sut, mockedAxios } = makeSut();

    const promise = sut.post(mockPostRequest());

    expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
  });
});
