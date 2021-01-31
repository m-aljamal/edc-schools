import { Db, MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export interface Request extends NextApiRequest {
  db: Db;
  dbClient: MongoClient;
  user: {
    email: string;
    id: string;
    name: string;
    password: string;
    isAdmin: boolean;
  };
}
export interface RequestStudnet extends NextApiRequest {
  db: Db;
  dbClient: MongoClient;
  userSchool: {
    _id: string;
    name: string;
    director: string;
  };
}
