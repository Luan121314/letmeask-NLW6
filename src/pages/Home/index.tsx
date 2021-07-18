import { useState } from 'react';
import { FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import googleImg from '../../assets/images/google-icon.svg';
import ilustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import Button from '../../components/Inputs/Button';
import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';
import './styles.scss';

const Home = (): JSX.Element => {
    const history = useHistory();
    const { user, signInWithGoogle } = useAuth();
    const [roomCode, setRooomCode] = useState('');

    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle();
        }
        history.push('/rooms/new');
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if (roomCode.trim() === '') {
            return;
        }
        const roomRef = await database.ref(`rooms/${roomCode}`).get();
        if (!roomRef.exists()) {
            alert('room does not exists');
            return;
        }

        if (roomRef.val().endedAt) {
            alert('Room does not exists');
            return;
        }

        history.push(`/rooms/${roomCode}`);
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={ilustrationImg} alt="ilustração simbolizando perguntas e responsta" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleImg} alt="Logo do google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                            onChange={(event) => setRooomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    );
};
export default Home;
