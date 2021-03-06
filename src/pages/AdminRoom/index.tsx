import { useHistory, useParams } from 'react-router-dom';
import logoImg from '../../assets/images/logo.svg';
import Button from '../../components/Inputs/Button';
import Question from '../../components/Question';
import RoomCode from '../../components/RoomCode';
import { useRoom } from '../../hooks/useRoom';
import { database } from '../../services/firebase';
import deleteImg from '../../assets/images/delete.svg';
import './styles.scss';

type RoomsParams = {
    id: string;
};

const AdminRoom = (): JSX.Element => {
    const params = useParams<RoomsParams>();
    const roomId = params.id;
    const { title, questions } = useRoom(roomId);
    const history = useHistory();

    async function handleDeleteQuestion(questionId: string) {
        const isConfirm = window.confirm('Tem certeza que você deseja excluir essa pergunta ?');
        if (isConfirm) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    async function handleEndRomm() {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        });

        history.push('/');
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button isOutlined onClick={handleEndRomm}>
                            Encerrar sala
                        </Button>
                    </div>
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} perguntas</span>}
                </div>

                <div className="question-list">
                    {questions.map((question) => (
                        <Question key={question.id} content={question.content} author={question.author}>
                            <button type="button" onClick={() => handleDeleteQuestion(question.id)}>
                                <img src={deleteImg} alt="Remover pergunta" />
                            </button>
                        </Question>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default AdminRoom;
