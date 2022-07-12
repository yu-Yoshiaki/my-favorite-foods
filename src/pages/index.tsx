import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BlogLayout } from "src/component";

type Response = {
  results: {
    shop: any[];
  };
};

const Root = () => {
  const [keyword, setKeyword] = useState<string | null>(null);
  const [preKeyword, setPreKeyword] = useState<string | null>(null);
  const [start, setStart] = useState(1);
  const [isLoadContinue, setIsLoadContinue] = useState(false);
  const [shop, setShop] = useState<any[]>();

  const endpoint = `/api/getData?keyword=${keyword}&start=${start}`;

  const handleSerch = async () => {
    if (!keyword) return;
    const res = await axios.get<Response>(endpoint);
    const data = res.data;

    if (data) {
      setStart(start + 10);
      setPreKeyword(keyword);
      setIsLoadContinue(true);
      setShop(data.results.shop);
    }
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    return setKeyword(e.target.value);
  };

  const handleContinue = async () => {
    if (!keyword || !shop) return;
    const res = await axios.get<Response>(endpoint);
    const data = res.data;
    if (data) {
      setShop([...shop, ...data.results.shop]);
    }
  };

  return (
    <BlogLayout>
      <ul>
        <li>keyword: {keyword}</li>
        <li>start: {start}</li>
        <li>preKeyword: {preKeyword}</li>
      </ul>

      <input type="text" onChange={handleChange} />
      <button onClick={handleSerch}>検索</button>
      <div className="mx-auto max-w-3xl">
        <ul className="mx-4 space-y-4">
          {shop?.map((item, index) => {
            return (
              <li
                key={index}
                className="my-4 bg-white rounded border-2 border-red-500"
              >
                <Link href={"/"}>
                  <a>
                    <div className="grid grid-cols-10">
                      <div className="col-span-2 self-center">
                        <div className="relative h-[100px]">
                          <Image
                            src={item.photo.mobile.s}
                            alt={item.name}
                            layout={"fill"}
                            objectFit={"cover"}
                          />
                        </div>
                      </div>
                      <div className="col-span-8 ml-3">
                        <div className="mt-2 mr-2 text-lg"> {item.name}</div>
                        <div className="pb-2 mt-2 mr-2 text-xs">
                          <div className="text-xs">
                            <span className="font-medium">
                              {item.genre.name}
                            </span>
                            <span className="ml-4">{item.catch}</span>
                          </div>
                          <p className="mt-1"> {item.access}</p>
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
        {isLoadContinue && (
          <button onClick={handleContinue}>さらに読み込む</button>
        )}
      </div>
    </BlogLayout>
  );
};

export default Root;
