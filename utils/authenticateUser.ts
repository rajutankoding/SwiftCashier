import * as LocalAuthentication from "expo-local-authentication";

export const authenticateUser = async (): Promise<boolean> => {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  if (!hasHardware) {
    console.warn("Perangkat tidak mendukung biometrik");
    return false;
  }

  const isEnrolled = await LocalAuthentication.isEnrolledAsync();
  if (!isEnrolled) {
    console.warn("Belum ada biometrik yang didaftarkan");
    return false;
  }

  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: "Verifikasi identitas",
    fallbackLabel: "Gunakan kode",
  });

  return result.success;
};
