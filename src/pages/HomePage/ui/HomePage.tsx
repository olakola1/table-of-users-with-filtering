import {Table} from "../../../components/Table";
import React, { useEffect, useRef, useState } from "react";
import { IUser } from "../../../types/user.ts";
import { fetchUsers } from "../../../api/userApi.ts";
import {Search} from "../../../components/Search";
import { Loading } from "../../../components/Loading";

const debounce=(callee:Function, timeoutMs:number) => {
  return function perform(...args:any[]) {
    let previousCall = (perform as any).lastCall;

    (perform as any).lastCall = Date.now()

    if (previousCall && (perform as any).lastCall - previousCall <= timeoutMs) {
      clearTimeout((perform as any).lastCallTimer)
    }

    (perform as any).lastCallTimer = setTimeout(() => callee(...args), timeoutMs)
  }
}

export const HomePage = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const debouncedFilter= useRef(
    debounce((search: string, usersList: IUser[]) => {
      if (!search.trim()) {
        setFilteredUsers(usersList);
        return;
      }

      const filtered = usersList.filter((user) =>
        user.name.first.toLowerCase().includes(search.toLowerCase()) ||
        user.name.last.toLowerCase().includes(search.toLowerCase())
      );

      setFilteredUsers(filtered);
    },1000)
  ).current;

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, []);

  const handleSearch = (query: string) => {
    debouncedFilter(query, users);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div>
        Ошибка при загрузке данных
      </div>
    )
  }

  return (
    <>
      <Search onSearch={handleSearch} />
      <Table users={filteredUsers}/>
    </>
  );
};