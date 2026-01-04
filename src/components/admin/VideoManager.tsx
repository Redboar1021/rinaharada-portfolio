import { useState } from 'react';
import styled from '@emotion/styled';
// Note: We'll assume a 'Video' model exists.

// Styled Components for Admin UI
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

const Button = styled.button<{ $variant?: 'primary' | 'danger' | 'secondary' }>`
  padding: 10px 20px;
  background-color: ${props =>
        props.$variant === 'primary' ? '#333' :
            props.$variant === 'danger' ? '#d32f2f' : '#f5f5f5'};
  color: ${props => props.$variant === 'secondary' ? '#333' : 'white'};
  border: 1px solid ${props => props.$variant === 'secondary' ? '#ddd' : 'transparent'};
  border-radius: 4px;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  
  &:hover {
    opacity: 0.9;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

const Th = styled.th`
  background-color: #f9f9f9;
  padding: 15px;
  text-align: left;
  font-weight: 600;
  color: #555;
  border-bottom: 2px solid #eee;
`;

const Td = styled.td`
  padding: 15px;
  border-bottom: 1px solid #eee;
  color: #333;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  margin-right: 10px;
  
  &:hover {
    color: #333;
    text-decoration: underline;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const VideoPreview = styled.div`
  margin-top: 10px;
  width: 100%;
  aspect-ratio: 16/9;
  background: #000;
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

// Types
interface Video {
    id: string;
    title: string;
    youtubeId: string;
    order: number;
}

// Helper to extract YouTube ID
const extractYoutubeId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

export const VideoManager = () => {
    const [videos, setVideos] = useState<Video[]>([
        { id: '1', title: 'Rachmaninoff Piano Concerto No.2', youtubeId: 'VyNNztb1Irk', order: 1 },
        { id: '2', title: 'Chopin Ballade No.1', youtubeId: 'hOwu3BFWlRo', order: 2 },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Video | null>(null);
    const [formData, setFormData] = useState({
        title: '', url: '', order: 0
    });

    const handleOpenCreate = () => {
        setEditingItem(null);
        setFormData({ title: '', url: '', order: videos.length + 1 });
        setIsModalOpen(true);
    };

    const handleOpenEdit = (item: Video) => {
        setEditingItem(item);
        setFormData({
            title: item.title,
            url: `https://youtu.be/${item.youtubeId}`,
            order: item.order
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this video?')) {
            // TODO: Call API to delete
            setVideos(prev => prev.filter(v => v.id !== id));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const youtubeId = extractYoutubeId(formData.url);
        if (!youtubeId) {
            alert('Invalid YouTube URL');
            return;
        }

        const newItem = {
            id: editingItem ? editingItem.id : Date.now().toString(),
            title: formData.title,
            youtubeId,
            order: formData.order
        };

        if (editingItem) {
            setVideos(prev => prev.map(item => item.id === newItem.id ? newItem : item).sort((a, b) => a.order - b.order));
        } else {
            setVideos(prev => [...prev, newItem].sort((a, b) => a.order - b.order));
        }
        setIsModalOpen(false);
    };

    return (
        <Container>
            <Toolbar>
                <Button $variant="primary" onClick={handleOpenCreate}>+ Add Video</Button>
            </Toolbar>

            <Table>
                <thead>
                    <tr>
                        <Th style={{ width: '60px' }}>Order</Th>
                        <Th>Thumbnail</Th>
                        <Th>Title</Th>
                        <Th>YouTube ID</Th>
                        <Th>Actions</Th>
                    </tr>
                </thead>
                <tbody>
                    {videos.map(video => (
                        <tr key={video.id}>
                            <Td>{video.order}</Td>
                            <Td>
                                <img
                                    src={`https://img.youtube.com/vi/${video.youtubeId}/default.jpg`}
                                    alt="thumbnail"
                                    style={{ height: '40px' }}
                                />
                            </Td>
                            <Td>{video.title}</Td>
                            <Td>{video.youtubeId}</Td>
                            <Td>
                                <ActionButton onClick={() => handleOpenEdit(video)}>Edit</ActionButton>
                                <ActionButton onClick={() => handleDelete(video.id)} style={{ color: '#d32f2f' }}>Delete</ActionButton>
                            </Td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {isModalOpen && (
                <ModalOverlay onClick={() => setIsModalOpen(false)}>
                    <ModalContent onClick={e => e.stopPropagation()}>
                        <h2 style={{ marginBottom: '20px' }}>{editingItem ? 'Edit Video' : 'New Video'}</h2>
                        <form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label>Title *</Label>
                                <Input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>YouTube URL *</Label>
                                <Input
                                    type="text"
                                    required
                                    placeholder="https://youtu.be/..."
                                    value={formData.url}
                                    onChange={e => setFormData({ ...formData, url: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Order</Label>
                                <Input
                                    type="number"
                                    required
                                    value={formData.order}
                                    onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                />
                            </FormGroup>

                            {extractYoutubeId(formData.url) && (
                                <VideoPreview>
                                    <iframe
                                        src={`https://www.youtube.com/embed/${extractYoutubeId(formData.url)}`}
                                        title="preview"
                                    />
                                </VideoPreview>
                            )}

                            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
                                <Button type="button" $variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                                <Button type="submit" $variant="primary">Save</Button>
                            </div>
                        </form>
                    </ModalContent>
                </ModalOverlay>
            )}
        </Container>
    );
};
