// import React, { useEffect, useCallback, useState, useRef } from "react";
// import { Box, Button, Stack } from "@mui/material";
// import { Lock, LockOpen, TextFields } from "@mui/icons-material";
// import {
//   RichTextEditor,
//   RichTextReadOnly,
//   MenuButton,
//   LinkBubbleMenu,
//   TableBubbleMenu,
//   insertImages
// } from "mui-tiptap";
// import EditorMenuControls from "./EditorMenuControls";
// import useExtensions from "./useExtensions";
// import './EditorCustomStyles.css';


// export default function Editor({ value, onChange, uploadImage, style }) {
//   // Use provided value or fallback to default content.
//   const initialContent = value;

//   const extensions = useExtensions({
//     placeholder: "Add your own content here..."
//   });

//   const rteRef = useRef(null);
//   const [isEditable, setIsEditable] = useState(true);
//   const [showMenuBar, setShowMenuBar] = useState(true);

//   // This effect will update the editor's content whenever `value` changes.
//   useEffect(() => {
//     if (rteRef.current && rteRef.current.editor && value) {
//       const currentHTML = rteRef.current.editor.getHTML();
//       if (currentHTML !== value) {
//         rteRef.current.editor.commands.setContent(value);
//       }
//     }
//   }, [value]);

//   const handleNewImageFiles = useCallback(
//     async (files, insertPosition) => {
//       if (!rteRef.current || !rteRef.current.editor) return;
//       const images = Array.from(files).filter(
//         file => (file.type || "").toLowerCase().startsWith("content_image/")
//       );
//       const attributesForImageFiles = images.map(file => ({
//         src: URL.createObjectURL(file),
//         alt: file.name
//       }));
//       insertImages({
//         images: attributesForImageFiles,
//         editor: rteRef.current.editor,
//         insertPosition
//       });
//     },
//     []
//   );

//   const handleDrop = useCallback((view, event) => {
//     if (!(event instanceof DragEvent) || !event.dataTransfer) return false;
//     const imageFiles = Array.from(event.dataTransfer.files).filter(file =>
//       (file.type || "").toLowerCase().startsWith("image/")
//     );
//     if (imageFiles.length > 0) {
//       const insertPosition = view.posAtCoords({
//         left: event.clientX,
//         top: event.clientY
//       })?.pos;
//       handleNewImageFiles(imageFiles, insertPosition);
//       event.preventDefault();
//       return true;
//     }
//     return false;
//   }, [handleNewImageFiles]);

//   const handlePaste = useCallback((view, event) => {
//     if (!event.clipboardData) return false;
//     const pastedImages = Array.from(event.clipboardData.files).filter(file =>
//       (file.type || "").toLowerCase().startsWith("image/")
//     );
//     if (pastedImages.length > 0) {
//       handleNewImageFiles(pastedImages);
//       return true;
//     }
//     return false;
//   }, [handleNewImageFiles]);

//   return (
//     <Box style={style}
//       sx={{
//         "&& .ProseMirror": {
//           minHeight: '300px',
//         },
//       }}
//     >
//       <RichTextEditor
//         ref={rteRef}
//         extensions={extensions}
//         content={initialContent}
//         editable={isEditable}
//         editorProps={{
//           handleDrop,
//           handlePaste
//         }}
//         renderControls={() => <EditorMenuControls />}
//         RichTextFieldProps={{
//           variant: "outlined",
//           MenuBarProps: {
//             hide: !showMenuBar
//           },
//           // Footer contains controls that toggle formatting, read-only mode and calls onChange with the HTML content.
//           footer: (
//             <Stack
//               direction="row"
//               spacing={2}
//               sx={{
//                 borderTopStyle: "solid",
//                 borderTopWidth: 1,
//                 borderTopColor: (theme) => theme.palette.divider,
//                 py: 1,
//                 px: 1.5,
//               }}
//             >
//               <MenuButton
//                 value="formatting"
//                 tooltipLabel={showMenuBar ? "Hide formatting" : "Show formatting"}
//                 size="small"
//                 onClick={() => setShowMenuBar(prev => !prev)}
//                 selected={showMenuBar}
//                 IconComponent={TextFields}
//               />
//               <MenuButton
//                 value="editing"
//                 tooltipLabel={isEditable ? "Switch to read-only mode" : "Allow editing"}
//                 size="small"
//                 onClick={() => setIsEditable(prev => !prev)}
//                 selected={!isEditable}
//                 IconComponent={isEditable ? Lock : LockOpen}
//               />
//               <Button
//                 variant="contained"
//                 size="small"
//                 onClick={() => {
//                   const htmlContent = rteRef.current?.editor?.getHTML() || "";
//                   if (onChange) {
//                     onChange(htmlContent);
//                   }
//                 }}
//               >
//                 Save
//               </Button>
//             </Stack>
//           )
//         }}
//       >
//         {() => (
//           <>
//             <LinkBubbleMenu />
//             <TableBubbleMenu />
//           </>
//         )}
//       </RichTextEditor>
//     </ Box>
//   );
// }

import React, { useEffect, useCallback, useState, useRef } from "react";
import { Box, Button, Stack } from "@mui/material";
import { Lock, LockOpen, TextFields } from "@mui/icons-material";
import {
  RichTextEditor,
  RichTextReadOnly,
  MenuButton,
  LinkBubbleMenu,
  TableBubbleMenu,
  insertImages
} from "mui-tiptap";
import EditorMenuControls from "./EditorMenuControls";
import useExtensions from "./useExtensions";
import './EditorCustomStyles.css';

export default function Editor({ value, onChange, uploadImage, style }) {
  // Use provided value or fallback to default content.
  const initialContent = value;
  const extensions = useExtensions({
    placeholder: "Add your own content here..."
  });
  const rteRef = useRef(null);
  const [isEditable, setIsEditable] = useState(true);
  const [showMenuBar, setShowMenuBar] = useState(true);

  // This effect will update the editor's content whenever `value` changes.
  useEffect(() => {
    if (rteRef.current && rteRef.current.editor && value) {
      const currentHTML = rteRef.current.editor.getHTML();
      if (currentHTML !== value) {
        rteRef.current.editor.commands.setContent(value);
      }
    }
  }, [value]);

  // Updated function to handle new image files by uploading them first
  const handleNewImageFiles = useCallback(
    async (files, insertPosition) => {
      if (!rteRef.current || !rteRef.current.editor) return;
      // Filter out non-image files
      const images = Array.from(files).filter(file =>
        (file.type || "").toLowerCase().startsWith("image/")
      );
      // Process each image file
      for (const file of images) {
        try {
          // Upload the image file using your uploadImage callback
          // Note: your uploadImage callback should accept the file (or a FormData object) and return a permanent URL.
          const response = await uploadImage(file);
          if (response && response.data && response.data.link) {
            // Insert the image with the permanent URL
            insertImages({
              images: [{ src: response.data.link, alt: file.name }],
              editor: rteRef.current.editor,
              insertPosition
            });
          } else {
            throw new Error("Upload did not return a valid URL.");
          }
        } catch (error) {
          console.error("Error uploading image:", error);
          // Optionally, you could fall back to inserting a placeholder
        }
      }
    },
    [uploadImage]
  );

  // Update handleDrop and handlePaste to use the async image upload function
  const handleDrop = useCallback((view, event) => {
    if (!(event instanceof DragEvent) || !event.dataTransfer) return false;
    const imageFiles = Array.from(event.dataTransfer.files).filter(file =>
      (file.type || "").toLowerCase().startsWith("image/")
    );
    if (imageFiles.length > 0) {
      const insertPosition = view.posAtCoords({
        left: event.clientX,
        top: event.clientY
      })?.pos;
      // Call the async function (errors will be logged in the function)
      handleNewImageFiles(imageFiles, insertPosition);
      event.preventDefault();
      return true;
    }
    return false;
  }, [handleNewImageFiles]);

  const handlePaste = useCallback((view, event) => {
    if (!event.clipboardData) return false;
    const pastedImages = Array.from(event.clipboardData.files).filter(file =>
      (file.type || "").toLowerCase().startsWith("image/")
    );
    if (pastedImages.length > 0) {
      handleNewImageFiles(pastedImages);
      return true;
    }
    return false;
  }, [handleNewImageFiles]);

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
        editorProps={{
          handleDrop,
          handlePaste
        }}
        renderControls={() => <EditorMenuControls />}
        RichTextFieldProps={{
          variant: "outlined",
          MenuBarProps: {
            hide: !showMenuBar
          },
          // Footer contains controls that toggle formatting, read-only mode and calls onChange with the HTML content.
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
                onClick={() => {
                  const htmlContent = rteRef.current?.editor?.getHTML() || "";
                  if (onChange) {
                    onChange(htmlContent);
                  }
                }}
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
