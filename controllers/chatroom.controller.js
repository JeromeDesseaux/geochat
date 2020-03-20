
class ChatroomController {

    index(req, res) {
        return res.status(200).json("Salut les jeunes");
    }

}

export default new ChatroomController()