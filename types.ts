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
    schoolId: string;
    type: string;
  };
}
export interface Request extends NextApiRequest {
  db: Db;
  dbClient: MongoClient;
  userSchool: {
    _id: string;
    name: string;
    director: string;
  };
}
export interface TeacherRequest extends NextApiRequest {
  db: Db;
  dbClient: MongoClient;
  user: {
    schoolId: string;
    classSuperVisor: string;
    divisionSuperVisor: string;
  };
}
