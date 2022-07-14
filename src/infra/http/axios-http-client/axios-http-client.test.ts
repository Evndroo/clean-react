import { faker } from "@faker-js/faker";
import axios from "axios";

import { AxiosHttpClient } from "./axios-http-client";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient();
};

describe("AxiosHttpClient", () => {
  it("Should call axios with correct url and http verb", async () => {
    const url = faker.internet.url();
    const sut = makeSut();

    sut.post({
      url: url,
    });

    expect(mockedAxios.post).toHaveBeenCalledWith(url);
  });
});
