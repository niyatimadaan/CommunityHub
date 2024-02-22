export default function responseObject(data) {
  const res = {
    status: true,
    content: {
      data: data,
    },
  };
  return res;
}
