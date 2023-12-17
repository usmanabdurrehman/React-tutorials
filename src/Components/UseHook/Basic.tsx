// @ts-ignore
import { useEffect, useState } from "react";
import { Error, Loader } from "../Misc";
import { User } from "../../types";

export const Basic = () => {
  const [data, setData] = useState<User[]>();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    fetch("http://localhost:7000/users")
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setData(data);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  if (isLoading) return <Loader />;
  if (isError) return <Error />;

  return (
    <ul>
      {data?.map((user: User) => (
        <li>{user?.name}</li>
      ))}
    </ul>
  );
};
