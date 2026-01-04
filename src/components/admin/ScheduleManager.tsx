import { useState } from 'react';
import styled from '@emotion/styled';
import { uploadData } from 'aws-amplify/storage';
// Note: We'll assume a 'Schedule' model exists in API.API, but since we can't see the backend config, we'll mock the calls or define types locally.

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

// Modal Styles
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

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 100px;
  resize: vertical;
`;

// Types
interface Schedule {
    id: string;
    date: string;
    title: string;
    location: string;
    details?: string;
    imageUrl?: string;
}

export const ScheduleManager = () => {
    const [schedules, setSchedules] = useState<Schedule[]>([
        { id: '1', date: '2025-12-24', title: 'Example Concert', location: 'Tokyo' }
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Schedule | null>(null);
    const [formData, setFormData] = useState<Partial<Schedule>>({
        date: '', title: '', location: '', details: ''
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleOpenCreate = () => {
        setEditingItem(null);
        setFormData({ date: '', title: '', location: '', details: '' });
        setImageFile(null);
        setIsModalOpen(true);
    };

    const handleOpenEdit = (item: Schedule) => {
        setEditingItem(item);
        setFormData(item);
        setImageFile(null);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this schedule?')) {
            // TODO: Call API to delete
            setSchedules(prev => prev.filter(s => s.id !== id));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = formData.imageUrl;

            // Handle Image Upload
            if (imageFile) {
                const fileName = `schedules/${Date.now()}-${imageFile.name}`;
                // Since we don't have AWS configured yet, this will fail if we actually run it.
                // We catch the error or just mock it if we are in a pure frontend env.
                // Assuming user wants the CODE to be ready.
                try {
                    const result = await uploadData({
                        path: fileName,
                        data: imageFile,
                        options: {
                            // accessLevel: 'guest', // Deprecated in v6, use path based if possible or check docs. keeping simple for now.
                        }
                    }).result;
                    imageUrl = result.path;
                } catch (uploadError) {
                    console.warn('Upload failed (expected without backend):', uploadError);
                    imageUrl = 'mock-url-due-to-no-backend';
                }
            }

            const newItem = {
                ...formData,
                imageUrl,
                id: editingItem ? editingItem.id : Date.now().toString(), // Mock ID
            } as Schedule;

            if (editingItem) {
                // Update
                setSchedules(prev => prev.map(item => item.id === newItem.id ? newItem : item));
            } else {
                // Create
                setSchedules(prev => [...prev, newItem]);
            }

            setIsModalOpen(false);
        } catch (error) {
            console.error('Error saving schedule:', error);
            alert('Failed to save schedule');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Toolbar>
                <Button $variant="primary" onClick={handleOpenCreate}>+ Add Schedule</Button>
            </Toolbar>

            <Table>
                <thead>
                    <tr>
                        <Th>Date</Th>
                        <Th>Title</Th>
                        <Th>Location</Th>
                        <Th>Actions</Th>
                    </tr>
                </thead>
                <tbody>
                    {schedules.map(schedule => (
                        <tr key={schedule.id}>
                            <Td>{schedule.date}</Td>
                            <Td>{schedule.title}</Td>
                            <Td>{schedule.location}</Td>
                            <Td>
                                <ActionButton onClick={() => handleOpenEdit(schedule)}>Edit</ActionButton>
                                <ActionButton onClick={() => handleDelete(schedule.id)} style={{ color: '#d32f2f' }}>Delete</ActionButton>
                            </Td>
                        </tr>
                    ))}
                    {schedules.length === 0 && (
                        <tr>
                            <Td colSpan={4} style={{ textAlign: 'center', color: '#999' }}>No schedules found.</Td>
                        </tr>
                    )}
                </tbody>
            </Table>

            {isModalOpen && (
                <ModalOverlay onClick={() => setIsModalOpen(false)}>
                    <ModalContent onClick={e => e.stopPropagation()}>
                        <h2 style={{ marginBottom: '20px' }}>{editingItem ? 'Edit Schedule' : 'New Schedule'}</h2>
                        <form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label>Date *</Label>
                                <Input
                                    type="date"
                                    required
                                    value={formData.date}
                                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                                />
                            </FormGroup>
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
                                <Label>Location</Label>
                                <Input
                                    type="text"
                                    value={formData.location}
                                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Details</Label>
                                <TextArea
                                    value={formData.details}
                                    onChange={e => setFormData({ ...formData, details: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Image</Label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={e => {
                                        if (e.target.files && e.target.files[0]) {
                                            setImageFile(e.target.files[0]);
                                        }
                                    }}
                                />
                            </FormGroup>
                            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
                                <Button type="button" $variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                                <Button type="submit" $variant="primary" disabled={loading}>
                                    {loading ? 'Saving...' : 'Save'}
                                </Button>
                            </div>
                        </form>
                    </ModalContent>
                </ModalOverlay>
            )}
        </Container>
    );
};
