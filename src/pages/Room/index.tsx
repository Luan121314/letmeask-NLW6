import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import logoImg from '../../assets/images/logo.svg';
import Button from '../../components/Inputs/Button';
import RoomCode from '../../components/RoomCode';
import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';
import '../../styles/room.scss';

type FirebaseQuestions = Record<
    string,
    {
        author: {
            name: string;
            avatar: string;
        };
        content: string;
        isAnswered: boolean;
        isHighlighted: boolean;
    }
>;

type RoomsParams = {
    id: string;
};

type QuestionsProps = {
    id: string;
    author: {
        name: string;
        avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
};

const Room = (): JSX.Element => {
    const { user } = useAuth();
    const params = useParams<RoomsParams>();
    const [newQuestion, setNewQuestion] = useState('');
    const [questions, setQuestions] = useState<QuestionsProps[]>([]);
    const [title, setTitle] = useState('');
    const roomId = params.id;

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);
        roomRef.on('value', (room) => {
            const databseRoom = room.val();
            const firebaseQuestions: FirebaseQuestions = databseRoom.questions ?? {};
            const parsedQuetions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered,
                };
            });
            setTitle(databseRoom.title);
            setQuestions(parsedQuetions);
        });
    }, [roomId]);

    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault();
        if (newQuestion.trim() === '') return;

        if (!user) {
            throw new Error('You must logged in');
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar,
            },
            isHighlighted: false,
            isAnswered: false,
        };

        await database.ref(`rooms/${roomId}/questions/`).push(question);
        setNewQuestion('');
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <RoomCode code={roomId} />
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} perguntas</span>}
                </div>
                <form onSubmit={handleSendQuestion}>
                    <textarea
                        placeholder="O que você quer perguntar ?"
                        onChange={(event) => setNewQuestion(event.target.value)}
                        value={newQuestion}
                    />
                    <div className="form-footer">
                        {user ? (
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        ) : (
                            <span>
                                Para enviar uma pergunta, <button>faça seu login</button>.
                            </span>
                        )}
                        <Button type="submit" disabled={!user}>
                            Enviar pergunta
                        </Button>
                    </div>
                </form>
                {JSON.stringify(questions)}
            </main>
        </div>
    );
};

export default Room;
