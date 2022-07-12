import type { NextApiRequest, NextApiResponse } from "next";

type Response = {
  results: {
    shop: any[];
  };
};

const getData = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  const { keyword, start } = req.query;

  const defaultEndpoint = `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${
    process.env.API_KEY as string
  }&format=json&keyword=${keyword}&start=${start ?? 1}`;

  try {
    const response = await fetch(defaultEndpoint);
    const data = await response.json();

    res.status(200).json(data);
  } catch (err: any) {
    res.status(err.statusCode || 500).json(err.message);
  }
};

export default getData;
