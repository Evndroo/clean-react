import { faker } from "@faker-js/faker";
import axios from "axios";

import { HttpPostParams } from "@/data/protocols/http";

import { AxiosHttpClient } from "./axios-http-client";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockAxiosPostResponse = {
  status: faker.internet.httpStatusCode(),
  data: faker.science.unit(),
};
mockedAxios.post.mockResolvedValue(mockAxiosPostResponse);

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient();
};

const mockPostRequest = (): HttpPostParams<any> => {
  return {
    url: faker.internet.url(),
    body: faker.science.unit(),
  };
};

describe("AxiosHttpClient", () => {
  it("Should call axios with correct values", async () => {
    const request = mockPostRequest();
    const sut = makeSut();

    sut.post(request);

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  it("should return the correct reponse status and body", async () => {
    const sut = makeSut();

    const httpResponse = await sut.post(mockPostRequest());

    expect(httpResponse).toEqual({
      statusCode: mockAxiosPostResponse.status,
      body: mockAxiosPostResponse.data,
    });
  });
});
