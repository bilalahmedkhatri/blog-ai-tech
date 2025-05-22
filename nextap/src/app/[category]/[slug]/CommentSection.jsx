'use client';

import React, { useState } from 'react';
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
    DialogActions
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

export default function CommentSection({ postId }) {
    const [comments, setComments] = useState([
        {
            id: 1,
            author: {
                name: 'John Doe',
                avatar: 'https://mui.com/static/images/avatar/1.jpg',
            },
            content: 'This is a great article! I learned a lot from it.',
            date: '2023-06-15T10:30:00Z',
            likes: 5,
            liked: false,
            replies: [
                {
                    id: 2,
                    author: {
                        name: 'Jane Smith',
                        avatar: 'https://mui.com/static/images/avatar/2.jpg',
                    },
                    content: 'I agree! The examples were very helpful.',
                    date: '2023-06-15T11:45:00Z',
                    likes: 2,
                    liked: false,
                }
            ]
        },
        {
            id: 3,
            author: {
                name: 'Alex Johnson',
                avatar: 'https://mui.com/static/images/avatar/3.jpg',
            },
            content: 'Could you elaborate more on the second point? I found it a bit confusing.',
            date: '2023-06-16T09:15:00Z',
            likes: 1,
            liked: false,
            replies: []
        }
    ]);

    const [newComment, setNewComment] = useState('');
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyContent, setReplyContent] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedComment, setSelectedComment] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editingComment, setEditingComment] = useState(null);
    const [editContent, setEditContent] = useState('');

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleSubmitComment = () => {
        if (!newComment.trim()) return;

        const newCommentObj = {
            id: Date.now(),
            author: {
                name: 'Current User', // Replace with actual user data
                avatar: 'https://mui.com/static/images/avatar/4.jpg', // Replace with actual user avatar
            },
            content: newComment,
            date: new Date().toISOString(),
            likes: 0,
            liked: false,
            replies: []
        };

        setComments([...comments, newCommentObj]);
        setNewComment('');
    };

    const handleReplyClick = (commentId) => {
        setReplyingTo(commentId);
        setReplyContent('');
    };

    const handleReplyChange = (event) => {
        setReplyContent(event.target.value);
    };

    const handleSubmitReply = (commentId) => {
        if (!replyContent.trim()) return;

        const newReply = {
            id: Date.now(),
            author: {
                name: 'Current User', // Replace with actual user data
                avatar: 'https://mui.com/static/images/avatar/4.jpg', // Replace with actual user avatar
            },
            content: replyContent,
            date: new Date().toISOString(),
            likes: 0,
            liked: false,
        };

        const updatedComments = comments.map(comment => {
            if (comment.id === commentId) {
                return {
                    ...comment,
                    replies: [...(comment.replies || []), newReply]
                };
            }
            return comment;
        });

        setComments(updatedComments);
        setReplyingTo(null);
        setReplyContent('');
    };

    const handleLikeComment = (commentId, isReply = false, parentId = null) => {
        if (isReply) {
            const updatedComments = comments.map(comment => {
                if (comment.id === parentId) {
                    const updatedReplies = comment.replies.map(reply => {
                        if (reply.id === commentId) {
                            return {
                                ...reply,
                                likes: reply.liked ? reply.likes - 1 : reply.likes + 1,
                                liked: !reply.liked
                            };
                        }
                        return reply;
                    });
                    return { ...comment, replies: updatedReplies };
                }
                return comment;
            });
            setComments(updatedComments);
        } else {
            const updatedComments = comments.map(comment => {
                if (comment.id === commentId) {
                    return {
                        ...comment,
                        likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
                        liked: !comment.liked
                    };
                }
                return comment;
            });
            setComments(updatedComments);
        }
    };

    const handleMenuOpen = (event, comment, isReply = false, parentId = null) => {
        setAnchorEl(event.currentTarget);
        setSelectedComment({ comment, isReply, parentId });
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedComment(null);
    };

    const handleDeleteClick = () => {
        setDeleteDialogOpen(true);
        handleMenuClose();
    };

    const handleDeleteConfirm = () => {
        if (!selectedComment) return;

        const { comment, isReply, parentId } = selectedComment;

        if (isReply) {
            const updatedComments = comments.map(c => {
                if (c.id === parentId) {
                    return {
                        ...c,
                        replies: c.replies.filter(reply => reply.id !== comment.id)
                    };
                }
                return c;
            });
            setComments(updatedComments);
        } else {
            setComments(comments.filter(c => c.id !== comment.id));
        }

        setDeleteDialogOpen(false);
    };

    const handleEditClick = () => {
        if (!selectedComment) return;

        const { comment } = selectedComment;
        setEditingComment(comment.id);
        setEditContent(comment.content);
        handleMenuClose();
    };

    const handleEditChange = (event) => {
        setEditContent(event.target.value);
    };

    const handleEditSave = () => {
        if (!editContent.trim() || !selectedComment) return;

        const { comment, isReply, parentId } = selectedComment;

        if (isReply) {
            const updatedComments = comments.map(c => {
                if (c.id === parentId) {
                    const updatedReplies = c.replies.map(reply => {
                        if (reply.id === comment.id) {
                            return { ...reply, content: editContent };
                        }
                        return reply;
                    });
                    return { ...c, replies: updatedReplies };
                }
                return c;
            });
            setComments(updatedComments);
        } else {
            const updatedComments = comments.map(c => {
                if (c.id === comment.id) {
                    return { ...c, content: editContent };
                }
                return c;
            });
            setComments(updatedComments);
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

            {comments.length > 0 ? (
                <Stack spacing={1}>
                    {comments.map((comment) => (
                        <CommentItem key={comment.id}>
                            <CommentHeader>
                                <CommentAuthor>
                                    <Avatar src={comment.author.avatar} alt={comment.author.name} />
                                    <Box>
                                        <Typography variant="subtitle1" fontWeight={500}>
                                            {comment.author.name}
                                        </Typography>
                                        <CommentDate>
                                            {formatDate(comment.date)}
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
                                <Button
                                    startIcon={comment.liked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
                                    size="small"
                                    onClick={() => handleLikeComment(comment.id)}
                                    color={comment.liked ? "primary" : "inherit"}
                                >
                                    {comment.likes > 0 && comment.likes}
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
                                                        src={reply.author.avatar}
                                                        alt={reply.author.name}
                                                        sx={{ width: 32, height: 32 }}
                                                    />
                                                    <Box>
                                                        <Typography variant="subtitle2" fontWeight={500}>
                                                            {reply.author.name}
                                                        </Typography>
                                                        <CommentDate>
                                                            {formatDate(reply.date)}
                                                        </CommentDate>




                                                    </Box>
                                                </CommentAuthor>

                                                <IconButton
                                                    size="small"
                                                    onClick={(e) => handleMenuOpen(e, reply, true, comment.id)}
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
                                                    startIcon={reply.liked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
                                                    size="small"
                                                    onClick={() => handleLikeComment(reply.id, true, comment.id)}
                                                    color={reply.liked ? "primary" : "inherit"}
                                                >
                                                    {reply.likes > 0 && reply.likes}
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
            )
            }

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
        </CommentPaper >
    );
}

