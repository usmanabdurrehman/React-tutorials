import { EuiFieldText } from "@elastic/eui";
import axios from "axios";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useQuery, QueryObserver, useQueryClient } from "react-query";

const getPostsById = (id: number | undefined) => async () => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/posts?userId=${id}`
  );
  return data;
};

const Listener = ({ id }: { id: number | undefined }) => {
  const queryClient = useQueryClient();

  const observer = new QueryObserver(queryClient, {
    queryKey: ["POSTS_BY_ID", id],
    queryFn: getPostsById(id),
  });

  observer.subscribe((data) => {});

  return null;
};

export default function QueryObserverWrapper() {
  const [id, setId] = useState<number | undefined>();

  const { data: users = [] } = useQuery(["USERS"], async () => {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/users`
    );
    return data;
  });

  const { data: postsById = [] } = useQuery(
    ["POSTS_BY_ID", id],
    getPostsById(id)
  );

  return (
    <div className="container-lg p-5">
      <div className="row">
        <div className="col">
          <h4>Users</h4>
          <div className="list-group">
            {users.map((user: any) => (
              <a
                className={`list-group-item list-group-item-action ${
                  user.id === id ? "active" : ""
                }`}
                onClick={() => setId(user.id)}
                href="#"
              >
                {user.name}
              </a>
            ))}
          </div>
        </div>
        <div className="col">
          <h4>Posts</h4>
          <div className="list-group">
            {postsById.map((post: any) => (
              <a className="list-group-item list-group-item-action">
                {post.title}
              </a>
            ))}
          </div>
        </div>
      </div>
      <Listener id={id} />
    </div>
  );
}
