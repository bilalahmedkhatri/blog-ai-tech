import React, { useEffect, useCallback, useState, useRef } from "react";
import { Box, Button, Stack } from "@mui/material";
import { Lock, LockOpen, TextFields } from "@mui/icons-material";
import {
  RichTextEditor,
  LinkBubbleMenu,
  TableBubbleMenu,
  MenuButton,
  MenuButtonImageUpload
} from "mui-tiptap";
import EditorMenuControls from "./EditorMenuControls";
import useExtensions from "./useExtensions";
import './EditorCustomStyles.css';

export default function Editor({ value, onChange, uploadImage, style }) {
  const initialContent = value;
  const extensions = useExtensions({
    placeholder: "Add your own content here..."
  });
  const rteRef = useRef(null);
  const [isEditable, setIsEditable] = useState(true);
  const [showMenuBar, setShowMenuBar] = useState(true);

  useEffect(() => {
    if (rteRef.current && rteRef.current.editor && value) {
      const currentHTML = rteRef.current.editor.getHTML();
      if (currentHTML !== value) {
        rteRef.current.editor.commands.setContent(value);
      }
    }
  }, [value]);

  const handleSaveContent = useCallback(() => {
    if (!rteRef.current?.editor) return;
    
    const htmlContent = rteRef.current.editor.getHTML();
    
    if (htmlContent.includes('blob:')) {
      console.warn('Content contains blob URLs which may not be accessible later');
    }
    
    if (onChange) {
      onChange(htmlContent);
    }
  }, [onChange]);

  return (
    <Box style={style}
      sx={{
        "&& .ProseMirror": {
          minHeight: '300px',
        },
      }}
    >
      <RichTextEditor
        ref={rteRef}
        extensions={extensions}
        content={initialContent}
        editable={isEditable}
        renderControls={() => (
          <EditorMenuControls>
            <MenuButtonImageUpload
              onUploadFiles={async (files) => {
                // Process each file
                const uploadedImages = [];
                for (const file of files) {
                  try {
                    const response = await uploadImage(file);
                    if (response && response.data && response.data.link) {
                      uploadedImages.push({
                        src: response.data.link,
                        alt: file.name || 'Uploaded image'
                      });
                    }
                  } catch (error) {
                    console.error('ttttError uploading image:', error);
                  }
                }
                return uploadedImages;
              }}
            />
          </EditorMenuControls>
        )}
        RichTextFieldProps={{
          variant: "outlined",
          MenuBarProps: {
            hide: !showMenuBar
          },
          footer: (
            <Stack
              direction="row"
              spacing={2}
              sx={{
                borderTopStyle: "solid",
                borderTopWidth: 1,
                borderTopColor: (theme) => theme.palette.divider,
                py: 1,
                px: 1.5,
              }}
            >
              <MenuButton
                value="formatting"
                tooltipLabel={showMenuBar ? "Hide formatting" : "Show formatting"}
                size="small"
                onClick={() => setShowMenuBar(prev => !prev)}
                selected={showMenuBar}
                IconComponent={TextFields}
              />
              <MenuButton
                value="editing"
                tooltipLabel={isEditable ? "Switch to read-only mode" : "Allow editing"}
                size="small"
                onClick={() => setIsEditable(prev => !prev)}
                selected={!isEditable}
                IconComponent={isEditable ? Lock : LockOpen}
              />
              <Button
                variant="contained"
                size="small"
                onClick={handleSaveContent}
              >
                Save
              </Button>
            </Stack>
          )
        }}
      >
        {() => (
          <>
            <LinkBubbleMenu />
            <TableBubbleMenu />
          </>
        )}
      </RichTextEditor>
    </Box>
  );
}
