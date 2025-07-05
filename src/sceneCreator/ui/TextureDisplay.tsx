import { Box, Button, Group, Text } from "@mantine/core";
import { SceneSettings, TextureField } from "../core/types";
import { useState } from "react";
import { Dropzone } from "@mantine/dropzone";
import p5 from "p5";

// props for the component
interface MyTextureDisplayRenameProps {
  textureData: TextureField;
  path: string[];
  handleSceneSettingUpdate: (
    path: [keyof SceneSettings, ...string[]],
    keys: string[],
    value: unknown
  ) => void;
  p: p5;
}

export default function TextureDisplay({
  textureData,
  path,
  handleSceneSettingUpdate,
  p,
}: MyTextureDisplayRenameProps) {
  const [selectedSurfaces, setSelectedSurfaces] = useState<Set<string>>(
    new Set()
  );
  const surfaces = Object.entries(textureData.value);

  const toggleSurface = (surfaceLabel: string) => {
    const newSelectedSurfaces = new Set(selectedSurfaces);
    if (newSelectedSurfaces.has(surfaceLabel)) {
      newSelectedSurfaces.delete(surfaceLabel);
    } else {
      newSelectedSurfaces.add(surfaceLabel);
    }
    setSelectedSurfaces(newSelectedSurfaces);
  };

  const selectAllSurfaces = () => {
    const allSurfaces = surfaces.map(([item, _]) => item);
    setSelectedSurfaces(new Set(allSurfaces));
  };

  const clearSelectedSurfaces = () => {
    setSelectedSurfaces(new Set());
  };

  const getSurfaceButtonStyle = (
    surfaceLabel: string,
    surfaceValue: p5.Image | null
  ) => {
    const isSelected = selectedSurfaces.has(surfaceLabel);
    const isAssigned = surfaceValue !== null;

    // default for unselected and unassigned surfaces
    const style = {
      backgroundColor: "#f8f9fa",
      color: "darkslategray",
      outline: "none",
    };

    if (isAssigned) {
      style.backgroundColor = "#007bff";
      style.color = "white";
    }
    if (isSelected) {
      style.outline = "3px solid red";
    }

    return style;
  };

  const handleImageUpload = (files: File[]) => {
    if (files.length === 0 || selectedSurfaces.size === 0 || !p) return;

    const file = files[0];
    const imageUrl = URL.createObjectURL(file);
    p.loadImage(
      imageUrl,
      (p5Image) => {
        URL.revokeObjectURL(imageUrl);
        const fullPath = [...path, "value"];
        handleSceneSettingUpdate(
          fullPath as [keyof SceneSettings],
          Array.from(selectedSurfaces),
          p5Image
        );
      },
      () => console.warn("error loading image")
    );

    clearSelectedSurfaces();
  };

  return (
    <Box mb={"md"}>
      <Text
        size="sm"
        fw={500}
        mb={"4px"}
        style={{ textTransform: "capitalize", minWidth: 80 }}
      >
        {textureData.label}
      </Text>

      {/* selection buttons */}
      {/* TODO: add a remove texture button to return to null */}
      <Group gap={"xs"} mb={"sm"}>
        <Button size={"xs"} variant={"subtle"} onClick={selectAllSurfaces}>
          Select All
        </Button>
        <Button
          size={"xs"}
          variant={"subtle"}
          onClick={clearSelectedSurfaces}
          disabled={selectedSurfaces.size === 0}
        >
          Clear Selected
        </Button>
      </Group>

      {/* surface buttons */}
      <Group mb={"sm"}>
        {surfaces.map(([surfaceLabel, surfaceValue]) => (
          <Button
            key={surfaceLabel}
            size={"sm"}
            onClick={() => {
              toggleSurface(surfaceLabel);
            }}
            style={getSurfaceButtonStyle(surfaceLabel, surfaceValue)}
          >
            {surfaceLabel}
          </Button>
        ))}
      </Group>

      {/* dropzone area */}
      <Dropzone
        onDrop={handleImageUpload}
        accept={["image/*"]}
        disabled={selectedSurfaces.size === 0}
        style={{
          opacity: selectedSurfaces.size === 0 ? 0.5 : 1,
          cursor: selectedSurfaces.size === 0 ? "not-allowed" : "pointer",
        }}
        maxFiles={1}
      >
        <Group justify="center" mih={100} style={{ pointerEvents: "none" }}>
          <Dropzone.Accept>
            <Text size="lg">📤</Text>
          </Dropzone.Accept>
          <Dropzone.Reject>
            <Text size="sm">Incorrect file type</Text>
          </Dropzone.Reject>
          <Dropzone.Idle>
            <Group gap={"sm"}>
              <Text size="lg">📷</Text>
              <div>
                <Text size={"xl"}>
                  {selectedSurfaces.size === 0
                    ? "Select surfaces then upload texture"
                    : `Selected ${selectedSurfaces.size} surface(s).`}
                </Text>
                <Text size={"sm"} c={"dimmed"}>
                  Drop image here or click to browse
                </Text>
              </div>
            </Group>
          </Dropzone.Idle>
        </Group>
      </Dropzone>
    </Box>
  );
}
