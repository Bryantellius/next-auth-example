const JoinHandler = (req, res) => {
  console.log(res.rooms);
  if (false) {
    res.redirect(`/editor?roomId=${roomId}&language=${rooms[roomId].language}`);
  } else {
    res.json({
      connect: false,
      msg: `The room you are attempting to connect to doesn't exist. Try another room id.`,
    });
  }
};

export default JoinHandler;
