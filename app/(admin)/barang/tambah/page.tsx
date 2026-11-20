import TambahBarangForm from "./form";
import { Heading, Text } from "@/components/ui/typography";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TambahBarangPage() {
  return (
    <div className="space-y-6 px-4 py-6 lg:px-6">
      <div data-motion="rise">
        <Heading as="h1" size="page">
          Tambah Barang
        </Heading>
          <Text tone="muted">
          Tambahkan barang baru ke sistem inventaris.
        </Text>
      </div>

      <Card data-motion="pop" data-motion-delay="80" className="max-w-2xl">
        <CardHeader>
          <CardTitle>Informasi Barang</CardTitle>
          <CardDescription>
            Lengkapi data barang di bawah ini.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <TambahBarangForm />
        </CardContent>
      </Card>
    </div>
  );
}