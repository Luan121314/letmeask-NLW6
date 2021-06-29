import { useState } from 'react';
import { FormEvent, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ilustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import Button from '../../components/Inputs/Button';
import AuthContext from '../../contexts/AuthContext';
import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';
import './../../styles/auth.scss';

const NewRoom = (): JSX.Element => {
    const { user } = useAuth();
    const history = useHistory();
    const [newRoom, setNewRoom] = useState('');

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        if (newRoom.trim() === '') {
            return;
        }
        const roomRef = database.ref('rooms');
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        });
        history.push(`/rooms/${firebaseRoom.key}`);
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
                    <h2>Criar nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                            value={newRoom}
                            onChange={(event) => setNewRoom(event.target.value)}
                        />
                        <Button type="submit">Criar sala</Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente
                        <Link to="/"> click aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    );
};

export default NewRoom;
