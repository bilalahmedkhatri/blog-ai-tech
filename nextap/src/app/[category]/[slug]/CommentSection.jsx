// app/components/BlogComments.tsx
'use client'

import {
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Button,
  Divider,
  Collapse,
} from '@mui/material'
import { useState } from 'react'
// import { useSession } from 'next-auth/react'
// import { createComment } from '@/lib/actions/commentActions'

export const dummyComments = [
  {
    id: 1,
    postId: 101,
    content: "By his own admission, Musk has said he hopes to save $1 Trillion in government waste...",
    createdAt: new Date("2025-05-24T10:15:00"),
    author: {
      id: 1,
      name: "vinny_g",
      avatar: "/avatars/vinny_g.png", // optional
    },
  },
  {
    id: 2,
    postId: 101,
    content: "One of many regime-bought Swamp Things.",
    createdAt: new Date("2025-05-24T09:10:00"),
    author: {
      id: 2,
      name: "thisainthotwings",
      avatar: "/avatars/thisainthotwings.png",
    },
  },
  {
    id: 3,
    postId: 101,
    content: "Elon Musk was not elected!",
    createdAt: new Date("2025-05-24T08:45:00"),
    author: {
      id: 3,
      name: "Magas have no clue",
      avatar: "/avatars/magas.png",
    },
  },
  {
    id: 4,
    postId: 101,
    content: "Musk paid Trump to cripple the agencies that regulate Musk's businesses. It's absolute corruption.",
    createdAt: new Date("2025-05-24T08:30:00"),
    author: {
      id: 4,
      name: "RyanDaniel72",
      avatar: "/avatars/ryan.png",
    },
  },
  {
    id: 5,
    postId: 101,
    content: "Here is the proof that the SC cares more about protecting the oligarchs...",
    createdAt: new Date("2025-05-24T08:00:00"),
    author: {
      id: 5,
      name: "Šari Sisile Nic Gabann",
      avatar: "/avatars/sari.png",
    },
  },
  {
    id: 6,
    postId: 101,
    content: "I wonder what Roberts game is. Has he really duped himself into believing Trump won’t throw him under the bus?",
    createdAt: new Date("2025-05-24T07:50:00"),
    author: {
      id: 6,
      name: "Robert1",
      avatar: "/avatars/robert.png",
    },
  },
];


export default function BlogComments({ postId, comments }) {
//   const { data: session } = useSession()
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!newComment.trim()) return
    setLoading(true)
    // await createComment({ postId, content: newComment })
    setNewComment('')
    setLoading(false)
    // Optionally refetch comments here
  }

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Conversation
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Start a discussion, not a fire. Post with kindness.
      </Typography>

      {/* Comment Box */}
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="Join the conversation"
          variant="outlined"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{ mt: 1 }}
          disabled={!newComment || loading}
          onClick={handleSubmit}
        >
          Post Comment
        </Button>
      </Box>

      <List disablePadding>
        {dummyComments.map((comment) => (
          <Box key={comment.id}>
            <ListItem alignItems="flex-start" disableGutters>
              <ListItemAvatar>
                <Avatar>{comment.author.name.charAt(0)}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography fontWeight={600}>{comment.author.name}</Typography>
                }
                secondary={
                  <>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {new Date(comment.createdAt).toLocaleString()}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {comment.content}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" sx={{ ml: 7 }} />
          </Box>
        ))}
      </List>
    </Box>
  )
}
