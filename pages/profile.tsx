import React from "react";
import { useRouter } from "next/router";
import { connect } from "../utils/database";
const Profile = ({ data }) => {
  const router = useRouter();
  const { id } = router.query;

  return <div>{id}</div>;
};

export default Profile;

export async function getServerSideProps(ctx) {
  const { db } = await connect();
  const data = await db.collection("employee").findOne({ _id: ctx.params.id });

  return { props: { data } };
}
