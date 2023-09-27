// TypeScript interfaces corresponding to the remotemessage.proto file

// Enums
enum RemoteKeyCode {
    KeycodeUnknown         = 0,
    KeycodeSoftLeft       = 1,
    KeycodeSoftRight      = 2,
    KeycodeHome            = 3,
    KeycodeBack            = 4,
    KeycodeCall            = 5,
    KeycodeEndcall         = 6,
    Keycode0               = 7,
    Keycode1               = 8,
    Keycode2               = 9,
    Keycode3               = 10,
    Keycode4               = 11,
    Keycode5               = 12,
    Keycode6               = 13,
    Keycode7               = 14,
    Keycode8               = 15,
    Keycode9               = 16,
    KeycodeStar            = 17,
    KeycodePound           = 18,
    KeycodeDpadUp         = 19,
    KeycodeDpadDown       = 20,
    KeycodeDpadLeft       = 21,
    KeycodeDpadRight      = 22,
    KeycodeDpadCenter     = 23,
    KeycodeVolumeUp       = 24,
    KeycodeVolumeDown     = 25,
    KeycodePower           = 26,
    KeycodeCamera          = 27,
    KeycodeClear           = 28,
    KeycodeA               = 29,
    KeycodeB               = 30,
    KeycodeC               = 31,
    KeycodeD               = 32,
    KeycodeE               = 33,
    KeycodeF               = 34,
    KeycodeG               = 35,
    KeycodeH               = 36,
    KeycodeI               = 37,
    KeycodeJ               = 38,
    KeycodeK               = 39,
    KeycodeL               = 40,
    KeycodeM               = 41,
    KeycodeN               = 42,
    KeycodeO               = 43,
    KeycodeP               = 44,
    KeycodeQ               = 45,
    KeycodeR               = 46,
    KeycodeS               = 47,
    KeycodeT               = 48,
    KeycodeU               = 49,
    KeycodeV               = 50,
    KeycodeW               = 51,
    KeycodeX               = 52,
    KeycodeY               = 53,
    KeycodeZ               = 54,
    KeycodeComma           = 55,
    KeycodePeriod          = 56,
    KeycodeAltLeft        = 57,
    KeycodeAltRight       = 58,
    KeycodeShiftLeft      = 59,
    KeycodeShiftRight     = 60,
    KeycodeTab             = 61,
    KeycodeSpace           = 62,
    KeycodeSym             = 63,
    KeycodeExplorer        = 64,
    KeycodeEnvelope        = 65,
    KeycodeEnter           = 66,
    KeycodeDel             = 67,
    KeycodeGrave           = 68,
    KeycodeMinus           = 69,
    KeycodeEquals          = 70,
    KeycodeLeftBracket    = 71,
    KeycodeRightBracket   = 72,
    KeycodeBackslash       = 73,
    KeycodeSemicolon       = 74,
    KeycodeApostrophe      = 75,
    KeycodeSlash           = 76,
    KeycodeAt              = 77,
    KeycodeNum             = 78,
    KeycodeHeadsethook     = 79,
    KeycodeFocus           = 80,
    KeycodePlus            = 81,
    KeycodeMenu            = 82,
    KeycodeNotification    = 83,
    KeycodeSearch          = 84,
    KeycodeMediaPlayPause= 85,
    KeycodeMediaStop      = 86,
    KeycodeMediaNext      = 87,
    KeycodeMediaPrevious  = 88,
    KeycodeMediaRewind    = 89,
    KeycodeMediaFastForward = 90,
    KeycodeMute            = 91,
    KeycodePageUp         = 92,
    KeycodePageDown       = 93,
    KeycodePictsymbols     = 94,
    KeycodeSwitchCharset  = 95,
    KeycodeButtonA        = 96,
    KeycodeButtonB        = 97,
    KeycodeButtonC        = 98,
    KeycodeButtonX        = 99,
    KeycodeButtonY        = 100,
    KeycodeButtonZ        = 101,
    KeycodeButtonL1       = 102,
    KeycodeButtonR1       = 103,
    KeycodeButtonL2       = 104,
    KeycodeButtonR2       = 105,
    KeycodeButtonThumbl   = 106,
    KeycodeButtonThumbr   = 107,
    KeycodeButtonStart    = 108,
    KeycodeButtonSelect   = 109,
    KeycodeButtonMode     = 110,
    KeycodeEscape          = 111,
    KeycodeForwardDel     = 112,
    KeycodeCtrlLeft       = 113,
    KeycodeCtrlRight      = 114,
    KeycodeCapsLock       = 115,
    KeycodeScrollLock     = 116,
    KeycodeMetaLeft       = 117,
    KeycodeMetaRight      = 118,
    KeycodeFunction        = 119,
    KeycodeSysrq           = 120,
    KeycodeBreak           = 121,
    KeycodeMoveHome       = 122,
    KeycodeMoveEnd        = 123,
    KeycodeInsert          = 124,
    KeycodeForward         = 125,
    KeycodeMediaPlay      = 126,
    KeycodeMediaPause     = 127,
    KeycodeMediaClose     = 128,
    KeycodeMediaEject     = 129,
    KeycodeMediaRecord    = 130,
    KeycodeF1              = 131,
    KeycodeF2              = 132,
    KeycodeF3              = 133,
    KeycodeF4              = 134,
    KeycodeF5              = 135,
    KeycodeF6              = 136,
    KeycodeF7              = 137,
    KeycodeF8              = 138,
    KeycodeF9              = 139,
    KeycodeF10             = 140,
    KeycodeF11             = 141,
    KeycodeF12             = 142,
    KeycodeNumLock        = 143,
    KeycodeNumpad0        = 144,
    KeycodeNumpad1        = 145,
    KeycodeNumpad2        = 146,
    KeycodeNumpad3        = 147,
    KeycodeNumpad4        = 148,
    KeycodeNumpad5        = 149,
    KeycodeNumpad6        = 150,
    KeycodeNumpad7        = 151,
    KeycodeNumpad8        = 152,
    KeycodeNumpad9        = 153,
    KeycodeNumpadDivide   = 154,
    KeycodeNumpadMultiply = 155,
    KeycodeNumpadSubtract = 156,
    KeycodeNumpadAdd      = 157,
    KeycodeNumpadDot      = 158,
    KeycodeNumpadComma    = 159,
    KeycodeNumpadEnter    = 160,
    KeycodeNumpadEquals   = 161,
    KeycodeNumpadLeftParen = 162,
    KeycodeNumpadRightParen = 163,
    KeycodeVolumeMute     = 164,
    KeycodeInfo            = 165,
    KeycodeChannelUp      = 166,
    KeycodeChannelDown    = 167,
    KeycodeZoomIn         = 168,
    KeycodeZoomOut        = 169,
    KeycodeTv              = 170,
    KeycodeWindow          = 171,
    KeycodeGuide           = 172,
    KeycodeDvr             = 173,
    KeycodeBookmark        = 174,
    KeycodeCaptions        = 175,
    KeycodeSettings        = 176,
    KeycodeTvPower        = 177,
    KeycodeTvInput        = 178,
    KeycodeStbPower       = 179,
    KeycodeStbInput       = 180,
    KeycodeAvrPower       = 181,
    KeycodeAvrInput       = 182,
    KeycodeProgRed        = 183,
    KeycodeProgGreen      = 184,
    KeycodeProgYellow     = 185,
    KeycodeProgBlue       = 186,
    KeycodeAppSwitch      = 187,
    KeycodeButton1        = 188,
    KeycodeButton2        = 189,
    KeycodeButton3        = 190,
    KeycodeButton4        = 191,
    KeycodeButton5        = 192,
    KeycodeButton6        = 193,
    KeycodeButton7        = 194,
    KeycodeButton8        = 195,
    KeycodeButton9        = 196,
    KeycodeButton10       = 197,
    KeycodeButton11       = 198,
    KeycodeButton12       = 199,
    KeycodeButton13       = 200,
    KeycodeButton14       = 201,
    KeycodeButton15       = 202,
    KeycodeButton16       = 203,
    KeycodeLanguageSwitch = 204,
    KeycodeMannerMode     = 205,
    Keycode3dMode         = 206,
    KeycodeContacts        = 207,
    KeycodeCalendar        = 208,
    KeycodeMusic           = 209,
    KeycodeCalculator      = 210,
    KeycodeZenkakuHankaku = 211,
    KeycodeEisu            = 212,
    KeycodeMuhenkan        = 213,
    KeycodeHenkan          = 214,
    KeycodeKatakanaHiragana = 215,
    KeycodeYen             = 216,
    KeycodeRo              = 217,
    KeycodeKana            = 218,
    KeycodeAssist          = 219,
    KeycodeBrightnessDown = 220,
    KeycodeBrightnessUp   = 221,
    KeycodeMediaAudioTrack = 222,
    KeycodeSleep           = 223,
    KeycodeWakeup          = 224,
    KeycodePairing         = 225,
    KeycodeMediaTopMenu  = 226,
    Keycode11              = 227,
    Keycode12              = 228,
    KeycodeLastChannel    = 229,
    KeycodeTvDataService = 230,
    KeycodeVoiceAssist = 231,
    KeycodeTvRadioService = 232,
    KeycodeTvTeletext = 233,
    KeycodeTvNumberEntry = 234,
    KeycodeTvTerrestrialAnalog = 235,
    KeycodeTvTerrestrialDigital = 236,
    KeycodeTvSatellite = 237,
    KeycodeTvSatelliteBs = 238,
    KeycodeTvSatelliteCs = 239,
    KeycodeTvSatelliteService = 240,
    KeycodeTvNetwork = 241,
    KeycodeTvAntennaCable = 242,
    KeycodeTvInputHdmi1 = 243,
    KeycodeTvInputHdmi2 = 244,
    KeycodeTvInputHdmi3 = 245,
    KeycodeTvInputHdmi4 = 246,
    KeycodeTvInputComposite1 = 247,
    KeycodeTvInputComposite2 = 248,
    KeycodeTvInputComponent1 = 249,
    KeycodeTvInputComponent2 = 250,
    KeycodeTvInputVga1 = 251,
    KeycodeTvAudioDescription = 252,
    KeycodeTvAudioDescriptionMixUp = 253,
    KeycodeTvAudioDescriptionMixDown = 254,
    KeycodeTvZoomMode = 255,
    KeycodeTvContentsMenu = 256,
    KeycodeTvMediaContextMenu = 257,
    KeycodeTvTimerProgramming = 258,
    KeycodeHelp = 259,
    KeycodeNavigatePrevious = 260,
    KeycodeNavigateNext   = 261,
    KeycodeNavigateIn     = 262,
    KeycodeNavigateOut    = 263,
    KeycodeStemPrimary = 264,
    KeycodeStem1 = 265,
    KeycodeStem2 = 266,
    KeycodeStem3 = 267,
    KeycodeDpadUpLeft    = 268,
    KeycodeDpadDownLeft  = 269,
    KeycodeDpadUpRight   = 270,
    KeycodeDpadDownRight = 271,
    KeycodeMediaSkipForward = 272,
    KeycodeMediaSkipBackward = 273,
    KeycodeMediaStepForward = 274,
    KeycodeMediaStepBackward = 275,
    KeycodeSoftSleep = 276,
    KeycodeCut = 277,
    KeycodeCopy = 278,
    KeycodePaste = 279,
    KeycodeSystemNavigationUp = 280,
    KeycodeSystemNavigationDown = 281,
    KeycodeSystemNavigationLeft = 282,
    KeycodeSystemNavigationRight = 283,
    KeycodeAllApps = 284,
    KeycodeRefresh = 285,
    KeycodeThumbsUp = 286,
    KeycodeThumbsDown = 287,
    KeycodeProfileSwitch = 288,
    KeycodeVideoApp1 = 289,
    KeycodeVideoApp2 = 290,
    KeycodeVideoApp3 = 291,
    KeycodeVideoApp4 = 292,
    KeycodeVideoApp5 = 293,
    KeycodeVideoApp6 = 294,
    KeycodeVideoApp7 = 295,
    KeycodeVideoApp8 = 296,
    KeycodeFeaturedApp1 = 297,
    KeycodeFeaturedApp2 = 298,
    KeycodeFeaturedApp3 = 299,
    KeycodeFeaturedApp4 = 300,
    KeycodeDemoApp1 = 301,
    KeycodeDemoApp2 = 302,
    KeycodeDemoApp3 = 303,
    KeycodeDemoApp4 = 304,
}

enum RemoteDirection {
    UnknownDirection = 0,
    StartLong = 1,
    EndLong = 2,
    Short = 3,
}

// Message Interfaces
interface RemoteAppLinkLaunchRequest {
    appLink: string;
}

interface RemoteResetPreferredAudioDevice {
}

interface RemoteSetPreferredAudioDevice {
}

interface RemoteAdjustVolumeLevel {
}

interface RemoteSetVolumeLevel {
    unknown1: number;
    unknown2: number;
    playerModel: string;
    unknown4: number;
    unknown5: number;
    volumeMax: number;
    volumeLevel: number;
    volumeMuted: boolean;
}

interface RemoteStart {
    started: boolean;
}

interface RemoteVoiceEnd {
}

interface RemoteVoicePayload {
}

interface RemoteVoiceBegin {
}

interface RemoteTextFieldStatus {
    counterField: number;
    value: string;
    start: number;
    end: number;
    int5: number;
    label: string;
}

interface RemoteImeShowRequest {
    remoteTextFieldStatus: RemoteTextFieldStatus;
}

interface RemoteEditInfo {
    insert: number;
}

interface RemoteImeBatchEdit {
    imeCounter: number;
    fieldCounter: number;
    editInfo: RemoteEditInfo;
}

interface RemoteAppInfo {
    counter: number;
    int2: number;
    int3: number;
    int4: string;
    int7: number;
    int8: number;
    label: string;
    appPackage: string;
    int13: number;
}

interface RemoteImeKeyInject {
    appInfo: RemoteAppInfo;
    textFieldStatus: RemoteTextFieldStatus;
}

interface RemoteKeyInject {
    keyCode: RemoteKeyCode;
    direction: RemoteDirection;
}

interface RemotePingResponse {
    val1: number;
}

interface RemotePingRequest {
    val1: number;
    val2: number;
}

interface RemoteSetActive {
    active: number;
}

interface RemoteDeviceInfo {
    model: string;
    vendor: string;
    unknown1: number;
    unknown2: string;
    packageName: string;
    appVersion: string;
}

interface RemoteConfigure {
    code1: number;
    deviceInfo: RemoteDeviceInfo;
}

interface RemoteError {
    value: boolean;
    message: RemoteMessage;
}

interface RemoteMessage {
    remoteConfigure?: RemoteConfigure;
    remoteSetActive?: RemoteSetActive;
    remoteError?: RemoteError;
    remotePingRequest?: RemotePingRequest;
    remotePingResponse?: RemotePingResponse;
    remoteKeyInject?: RemoteKeyInject;
    remoteImeKeyInject?: RemoteImeKeyInject;
    remoteImeBatchEdit?: RemoteImeBatchEdit;
    remoteImeShowRequest?: RemoteImeShowRequest;
    remoteVoiceBegin?: RemoteVoiceBegin;
    remoteVoicePayload?: RemoteVoicePayload;
    remoteVoiceEnd?: RemoteVoiceEnd;
    remoteStart?: RemoteStart;
    remoteSetVolumeLevel?: RemoteSetVolumeLevel;
    remoteAdjustVolumeLevel?: RemoteAdjustVolumeLevel;
    remoteSetPreferredAudioDevice?: RemoteSetPreferredAudioDevice;
    remoteResetPreferredAudioDevice?: RemoteResetPreferredAudioDevice;
    remoteAppLinkLaunchRequest?: RemoteAppLinkLaunchRequest;
}

export default RemoteMessage;
