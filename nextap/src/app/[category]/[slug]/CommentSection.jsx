
'use client';

import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Avatar,
    Divider,
    Paper,
    Stack,
    IconButton,
    Menu,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ReplyIcon from '@mui/icons-material/Reply';

const CommentPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginTop: theme.spacing(4),
    borderRadius: theme.spacing(1),
}));

const CommentItem = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2, 0),
    '&:not(:last-child)': {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
}));

const CommentHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing(1),
}));

const CommentAuthor = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
}));

const CommentDate = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontSize: '0.75rem',
}));

const CommentActions = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    marginTop: theme.spacing(1),
}));

const ReplyContainer = styled(Box)(({ theme }) => ({
    marginLeft: theme.spacing(6),
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(2),
    borderTop: `1px dashed ${theme.palette.divider}`,
}));

// Helper to build threaded comments from flat array
function buildThreadedComments(comments) {
    const map = {};
    const roots = [];
    comments.forEach(c => { map[c.id] = { ...c, replies: [] }; });
    comments.forEach(c => {
        if (c.parentId) {
            if (map[c.parentId]) map[c.parentId].replies.push(map[c.id]);
        } else {
            roots.push(map[c.id]);
        }
    });
    return roots;
}

export default function CommentSection({ postId }) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState('');
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyContent, setReplyContent] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedComment, setSelectedComment] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editingComment, setEditingComment] = useState(null);
    const [editContent, setEditContent] = useState('');

    // Fetch comments from backend
    useEffect(() => {
        setLoading(true);
        fetch(`/api/comments?postId=${postId}`)
            .then(res => res.json())
            .then(data => {
                setComments(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [postId]);

    const handleCommentChange = (event) => setNewComment(event.target.value);

    const handleSubmitComment = async () => {
        if (!newComment.trim()) return;
        const res = await fetch('/api/comments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                postId,
                content: newComment,
            }),
        });
        if (res.ok) {
            const comment = await res.json();
            setComments(prev => [...prev, comment]);
            setNewComment('');
        }
    };

    const handleReplyClick = (commentId) => {
        setReplyingTo(commentId);
        setReplyContent('');
    };

    const handleReplyChange = (event) => setReplyContent(event.target.value);

    const handleSubmitReply = async (parentId) => {
        if (!replyContent.trim()) return;
        const res = await fetch('/api/comments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                postId,
                content: replyContent,
                parentId,
            }),
        });
        if (res.ok) {
            const reply = await res.json();
            setComments(prev => [...prev, reply]);
            setReplyingTo(null);
            setReplyContent('');
        }
    };

    // Like, Edit, Delete handlers would be similar, calling backend endpoints

    const handleMenuOpen = (event, comment) => {
        setAnchorEl(event.currentTarget);
        setSelectedComment(comment);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedComment(null);
    };

    const handleDeleteClick = () => {
        setDeleteDialogOpen(true);
        handleMenuClose();
    };

    const handleDeleteConfirm = async () => {
        if (!selectedComment) return;
        const res = await fetch(`/api/comments/${selectedComment.id}`, { method: 'DELETE' });
        if (res.ok) {
            setComments(prev => prev.filter(c => c.id !== selectedComment.id && c.parentId !== selectedComment.id));
        }
        setDeleteDialogOpen(false);
    };

    const handleEditClick = () => {
        if (!selectedComment) return;
        setEditingComment(selectedComment.id);
        setEditContent(selectedComment.content);
        handleMenuClose();
    };

    const handleEditChange = (event) => setEditContent(event.target.value);

    const handleEditSave = async () => {
        if (!editContent.trim() || !selectedComment) return;
        const res = await fetch(`/api/comments/${selectedComment.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: editContent }),
        });
        if (res.ok) {
            setComments(prev =>
                prev.map(c =>
                    c.id === selectedComment.id ? { ...c, content: editContent } : c
                )
            );
        }
        setEditingComment(null);
        setEditContent('');
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const threadedComments = buildThreadedComments(comments);

    return (
        <CommentPaper elevation={1}>
            <Typography variant="h5" component="h2" fontWeight={600} gutterBottom>
                Comments ({comments.length})
            </Typography>

            <Box sx={{ mt: 3 }}>
                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={handleCommentChange}
                    variant="outlined"
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                    <Button
                        variant="contained"
                        onClick={handleSubmitComment}
                        disabled={!newComment.trim()}
                    >
                        Post Comment
                    </Button>
                </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            {loading ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                    <CircularProgress />
                </Box>
            ) : threadedComments.length > 0 ? (
                <Stack spacing={1}>
                    {threadedComments.map((comment) => (
                        <CommentItem key={comment.id}>
                            <CommentHeader>
                                <CommentAuthor>
                                    <Avatar src={comment.author?.profileImage || ''} alt={comment.author?.firstName || 'User'} />
                                    <Box>
                                        <Typography variant="subtitle1" fontWeight={500}>
                                            {comment.author?.firstName} {comment.author?.lastName}
                                        </Typography>
                                        <CommentDate>
                                            {formatDate(comment.createdAt)}
                                        </CommentDate>
                                    </Box>
                                </CommentAuthor>

                                <IconButton
                                    size="small"
                                    onClick={(e) => handleMenuOpen(e, comment)}
                                >
                                    <MoreVertIcon fontSize="small" />
                                </IconButton>
                            </CommentHeader>

                            {editingComment === comment.id ? (
                                <Box sx={{ mt: 1, mb: 2 }}>
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={2}
                                        value={editContent}
                                        onChange={handleEditChange}
                                        variant="outlined"
                                        size="small"
                                    />
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, gap: 1 }}>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() => setEditingComment(null)}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            onClick={handleEditSave}
                                        >
                                            Save
                                        </Button>
                                    </Box>
                                </Box>
                            ) : (
                                <Typography variant="body1" sx={{ mt: 1, mb: 2 }}>
                                    {comment.content}
                                </Typography>
                            )}

                            <CommentActions>
                                {/* Like button can be implemented with backend */}
                                <Button
                                    startIcon={<ThumbUpOutlinedIcon />}
                                    size="small"
                                    // onClick={() => handleLikeComment(comment.id)}
                                    color="inherit"
                                >
                                    {/* {comment.likes > 0 && comment.likes} */}
                                </Button>

                                <Button
                                    startIcon={<ReplyIcon />}
                                    size="small"
                                    onClick={() => handleReplyClick(comment.id)}
                                >
                                    Reply
                                </Button>
                            </CommentActions>

                            {/* Reply form */}
                            {replyingTo === comment.id && (
                                <Box sx={{ mt: 2, ml: { xs: 0, sm: 6 } }}>
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={2}
                                        placeholder="Write a reply..."
                                        value={replyContent}
                                        onChange={handleReplyChange}
                                        variant="outlined"
                                        size="small"
                                    />
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, gap: 1 }}>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() => setReplyingTo(null)}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            onClick={() => handleSubmitReply(comment.id)}
                                            disabled={!replyContent.trim()}
                                        >
                                            Reply
                                        </Button>
                                    </Box>
                                </Box>
                            )}

                            {/* Replies */}
                            {comment.replies && comment.replies.length > 0 && (
                                <ReplyContainer>
                                    {comment.replies.map((reply) => (
                                        <Box key={reply.id} sx={{ mb: 2 }}>
                                            <CommentHeader>
                                                <CommentAuthor>
                                                    <Avatar
                                                        src={reply.author?.profileImage || ''}
                                                        alt={reply.author?.firstName || 'User'}
                                                        sx={{ width: 32, height: 32 }}
                                                    />
                                                    <Box>
                                                        <Typography variant="subtitle2" fontWeight={500}>
                                                            {reply.author?.firstName} {reply.author?.lastName}
                                                        </Typography>
                                                        <CommentDate>
                                                            {formatDate(reply.createdAt)}
                                                        </CommentDate>
                                                    </Box>
                                                </CommentAuthor>

                                                <IconButton
                                                    size="small"
                                                    onClick={(e) => handleMenuOpen(e, reply)}
                                                >
                                                    <MoreVertIcon fontSize="small" />
                                                </IconButton>
                                            </CommentHeader>

                                            {editingComment === reply.id ? (
                                                <Box sx={{ mt: 1, mb: 2 }}>
                                                    <TextField
                                                        fullWidth
                                                        multiline
                                                        rows={2}
                                                        value={editContent}
                                                        onChange={handleEditChange}
                                                        variant="outlined"
                                                        size="small"
                                                    />
                                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, gap: 1 }}>
                                                        <Button
                                                            variant="outlined"
                                                            size="small"
                                                            onClick={() => setEditingComment(null)}
                                                        >
                                                            Cancel
                                                        </Button>
                                                        <Button
                                                            variant="contained"
                                                            size="small"
                                                            onClick={handleEditSave}
                                                        >
                                                            Save
                                                        </Button>
                                                    </Box>
                                                </Box>
                                            ) : (
                                                <Typography variant="body2" sx={{ mt: 1, mb: 1 }}>
                                                    {reply.content}
                                                </Typography>
                                            )}

                                            <CommentActions>
                                                <Button
                                                    startIcon={<ThumbUpOutlinedIcon />}
                                                    size="small"
                                                    color="inherit"
                                                >
                                                    {/* {reply.likes > 0 && reply.likes} */}
                                                </Button>
                                            </CommentActions>
                                        </Box>
                                    ))}
                                </ReplyContainer>
                            )}
                        </CommentItem>
                    ))}
                </Stack>
            ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                        No comments yet. Be the first to share your thoughts!
                    </Typography>
                </Box>
            )}

            {/* Comment menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleEditClick}>Edit</MenuItem>
                <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>Delete</MenuItem>
            </Menu>

            {/* Delete confirmation dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
            >
                <DialogTitle>Delete Comment</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete this comment? This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleDeleteConfirm} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </CommentPaper>
    );
}
